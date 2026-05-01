import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ChevronRight, 
  Home as HomeIcon, 
  BookOpen, 
  User, 
  Search, 
  Bell, 
  Menu,
  CreditCard,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Building,
  Eye,
  EyeOff,
  LogOut,
  Moon,
  Sun,
  QrCode,
  Plus,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { signInWithGoogle } from './lib/firebase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CONTEXT ---
const ThemeContext = createContext({ isDark: false, toggle: () => {} });

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(prev => !prev) }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// --- SHARED COMPONENTS ---

const DarkModeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button 
      onClick={toggle}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-accent/50 text-primary dark:text-white transition-all hover:scale-105 active:scale-95 shadow-sm border border-transparent dark:border-white/5"
    >
      {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
    </button>
  );
};

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("relative w-12 h-12 flex items-center justify-center shrink-0", className)}>
    <div className="absolute inset-0 bg-primary rounded-lg translate-y-0.5 translate-x-0.5" />
    <div className="absolute inset-0 bg-accent rounded-lg -translate-y-0.5 -translate-x-0.5" />
    <div className="relative z-10 bg-secondary p-1.5 rounded-lg shadow-sm w-full h-full flex items-center justify-center">
      <GraduationCap className="text-white w-full h-full" />
    </div>
  </div>
);

const Button = ({ className, variant = 'primary', ...props }: any) => {
  const variants = {
    primary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-accent text-primary hover:bg-accent/20',
    ghost: 'text-primary hover:bg-accent/30',
  };
  return (
    <button 
      className={cn(
        "py-3 px-6 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    />
  );
};

const Input = ({ label, icon: Icon, type = 'text', className, ...props }: any) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center pointer-events-none group-focus-within:text-secondary transition-colors">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <input 
        type={type}
        className={cn(
          "w-full bg-accent/10 dark:bg-dark-accent/50 border border-gray-200 dark:border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-secondary/50 rounded-xl py-3 pr-4 outline-none transition-all dark:text-white placeholder:text-gray-400",
          Icon ? "pl-12" : "pl-4",
          className
        )}
        {...props}
      />
    </div>
  </div>
);

// --- SHARED DATA LOGIC ---
const DEFAULT_COURSES = [
  { id: 1, title: 'MERN Stack Mastery', price: '₹20,000', icon: 'BookOpen', desc: 'Master MongoDB, Express, React, Node' },
  { id: 2, title: 'Full Stack Python', price: '₹20,000', icon: 'BookOpen', desc: 'Django and modern frontend frameworks' },
  { id: 3, title: 'Cybersecurity Pro', price: '₹25,000', icon: 'Lock', desc: 'Learn ethical hacking and network security' },
  { id: 4, title: 'Data Science & ML', price: '₹30,000', icon: 'GraduationCap', desc: 'Master data analysis and predictive modeling' },
  { id: 5, title: 'Digital Marketing', price: '₹15,000', icon: 'Search', desc: 'SEO, SEM and social media marketing' },
  { id: 6, title: 'UI/UX Design Mastery', price: '₹18,000', icon: 'GraduationCap', desc: 'Advanced interface and experience design' },
  { id: 7, title: 'Cloud Computing (AWS)', price: '₹28,000', icon: 'Lock', desc: 'Architecting for reliability and scale' },
  { id: 8, title: 'Blockchain Development', price: '₹35,000', icon: 'BookOpen', desc: 'Solidity and smart contract architecture' },
];

const iconMap: Record<string, any> = {
  BookOpen,
  Lock,
  GraduationCap,
  Search,
  CheckCircle2,
  Home: HomeIcon,
  User,
  CreditCard
};

const getStoredCourses = () => {
  const stored = localStorage.getItem('courses');
  return stored ? JSON.parse(stored) : DEFAULT_COURSES;
};

const saveStoredCourses = (courses: any[]) => {
  localStorage.setItem('courses', JSON.stringify(courses));
  // Dispatch a custom event to notify other components in the same tab
  window.dispatchEvent(new Event('coursesUpdated'));
};

const getStoredStudents = () => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [];
};

const getStoredUPI = () => {
    return localStorage.getItem('upi_id') || '8448107875@ybl';
};

const saveStoredUPI = (upi: string) => {
    localStorage.setItem('upi_id', upi);
    window.dispatchEvent(new Event('upiUpdated'));
};

// --- SCREENS ---

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/register'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-bg-off-white dark:bg-dark-bg transition-colors duration-300">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo />
      </motion.div>
      <div className="mt-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary dark:text-white transition-colors">Small Copper</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Build Your Tech Career</p>
      </div>
      
      <div className="absolute bottom-20 w-64 space-y-4">
        <div className="h-1.5 w-full bg-gray-200 dark:bg-dark-accent rounded-full overflow-hidden transition-colors">
          <motion.div 
            className="h-full bg-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] tracking-[0.2em] text-center text-gray-400 font-bold uppercase transition-colors">INITIALIZING...</p>
      </div>
    </div>
  );
};

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginMode = location.pathname.includes('/login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user?.email) localStorage.setItem('userEmail', user.email);
      navigate('/home');
    } catch (err) {
      alert("Google Sign In Failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (isLoginMode) {
      if (email === 'admin@gmail.com' && password === 'admin@password@2004') {
        localStorage.setItem('userEmail', email);
        navigate('/admin');
      } else {
        localStorage.setItem('userEmail', email);
        navigate('/home');
      }
    } else {
      localStorage.setItem('userEmail', email);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-bg-off-white dark:bg-dark-bg transition-colors duration-300">
      <div className="absolute top-6 right-6">
        <DarkModeToggle />
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md space-y-8 bg-white dark:bg-dark-card p-8 rounded-[2rem] shadow-xl dark:shadow-none border border-gray-100 dark:border-dark-accent transition-colors duration-300"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Logo className="w-10 h-10" />
             <span className="text-xl font-bold text-primary dark:text-white">Small Copper</span>
          </div>
          <h2 className="text-4xl font-bold text-primary dark:text-white pt-4">
            {isLoginMode ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {isLoginMode ? "Login to your account to continue learning." : "Join our community to access premium educational resources."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {!isLoginMode && <Input label="Full Name" icon={User} placeholder="Rahul Sharma" name="fullname" />}
          <Input label="Email Address" icon={Mail} placeholder="rahul@example.com" type="email" name="email" required />
          
          {!isLoginMode && (
            <div className="grid grid-cols-[80px_1fr] gap-2 items-end">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone</label>
                <div className="bg-accent/10 dark:bg-dark-accent rounded-xl py-3 text-center border border-gray-200 dark:border-transparent font-medium dark:text-white transition-colors">+91</div>
              </div>
              <Input icon={Phone} placeholder="88765 43210" name="phone" />
            </div>
          )}

          {!isLoginMode && <Input label="College Name" icon={Building} placeholder="IIT Bombay" name="college" />}
          
          <div className="relative">
             <Input label="Password" icon={Lock} type={showPassword ? "text" : "password"} placeholder="••••••••" name="password" required />
             <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-primary dark:hover:text-secondary transition-colors"
             >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
          </div>

          <Button className="w-full bg-secondary shadow-secondary/20 hover:bg-secondary/90 text-white border-none" type="submit">
            {isLoginMode ? "Sign In" : "Submit Registration"} <ChevronRight size={18} />
          </Button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-dark-accent transition-colors"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-dark-card text-gray-500 transition-colors">Or</span></div>
        </div>

        <Button variant="outline" className="w-full bg-white dark:bg-dark-accent shadow-sm dark:text-white dark:border-none hover:bg-gray-50 transition-colors" onClick={handleGoogleSignIn} disabled={isLoading}>
           {isLoading ? "Connecting..." : "Connect with Google"}
        </Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to={isLoginMode ? "/register" : "/login"} className="text-primary dark:text-secondary font-bold hover:underline">
            {isLoginMode ? "Register here" : "Log in here"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Small Copper! 🚀', time: 'Just now', read: false },
    { id: 2, title: 'Check out the new Full Stack Java course!', time: '2h ago', read: false },
    { id: 3, title: 'Special offer: 20% off on AI courses', time: '5h ago', read: true },
  ]);

  const [courses, setCourses] = useState(getStoredCourses());

  useEffect(() => {
    const handleUpdate = () => setCourses(getStoredCourses());
    window.addEventListener('coursesUpdated', handleUpdate);
    return () => window.removeEventListener('coursesUpdated', handleUpdate);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const userEmail = localStorage.getItem('userEmail');
  const isAdmin = userEmail === 'admin@gmail.com';

  const userFirstName = userEmail?.split('@')[0] || 'Learner';
  const capitalizedName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pb-24 bg-bg-off-white dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-dark-accent">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-primary dark:text-white uppercase tracking-wider text-sm">Small Copper</span>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "p-2.5 rounded-xl text-gray-600 dark:text-white relative hover:scale-105 transition-all shadow-sm",
                showNotifications ? "bg-accent/20 dark:bg-dark-accent" : "bg-gray-100 dark:bg-dark-accent/50"
              )}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-bg" />}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-accent overflow-hidden z-[60]"
                >
                  <div className="p-4 border-b border-gray-50 dark:border-dark-accent flex justify-between items-center bg-gray-50/50 dark:bg-dark-accent/20">
                    <h4 className="font-bold text-sm dark:text-white">Notifications</h4>
                    {unreadCount > 0 && <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">{unreadCount} NEW</span>}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-gray-50 dark:border-dark-accent last:border-0 hover:bg-gray-50 dark:hover:bg-dark-accent/10 transition-colors cursor-pointer" onClick={() => {
                        setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))
                      }}>
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm font-medium dark:text-gray-200 line-clamp-2">{n.title}</p>
                          {!n.read && <div className="w-2 h-2 bg-secondary rounded-full mt-1 shrink-0" />}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-bold">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={markAllRead}
                    className="w-full py-3 text-xs font-bold text-primary dark:text-secondary bg-gray-50/50 dark:bg-dark-accent/20 hover:bg-gray-100 transition-colors"
                  >
                    MARK ALL AS READ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isAdmin && (
            <button 
              onClick={() => navigate('/admin')}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-accent/50 text-gray-600 dark:text-white hover:scale-105 transition-all shadow-sm"
              title="Admin Panel"
            >
              <Menu size={20} />
            </button>
          )}
          
          <button 
            onClick={() => {
              localStorage.removeItem('userEmail');
              navigate('/login');
            }}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-accent/50 text-gray-600 dark:text-white hover:scale-105 transition-all shadow-sm group"
            title="Logout"
          >
            <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </header>

      <main className="mt-20 px-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white">Hello, {capitalizedName}</h1>
          <p className="text-gray-500 dark:text-gray-400">Ready to continue your learning journey?</p>
        </div>

        {/* Hero Card */}
        <div className="bg-primary dark:bg-dark-card rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="relative z-10 space-y-4 max-w-[200px]">
            <h2 className="text-2xl font-bold leading-tight">Upgrade your skills today</h2>
            <p className="text-accent/60 text-sm">Unlock premium courses and accelerate your career.</p>
            <Button className="bg-secondary px-4 py-2 text-sm">Explore Premium</Button>
          </div>
          <GraduationCap className="absolute -bottom-4 -right-10 w-48 h-48 text-white/5 rotate-12" />
        </div>

        {/* Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl dark:text-white">Courses</h3>
            <button 
              onClick={() => navigate('/home')} // Refreshes view
              className="text-xs font-bold text-primary dark:text-secondary tracking-widest hover:underline px-2 py-1 uppercase"
            >
              View All
            </button>
          </div>

          <div className="grid gap-4">
            {courses.map((course: any) => {
              const IconComp = iconMap[course.icon] || BookOpen;
              return (
                <motion.div 
                  key={course.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    if (isAdmin) {
                      alert("Admin accounts cannot purchase courses. Please use a student account.");
                      return;
                    }
                    navigate('/checkout');
                  }}
                  className="group flex items-center gap-4 bg-white dark:bg-dark-card p-4 rounded-2xl border border-gray-100 dark:border-dark-accent hover:border-accent hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 bg-accent/20 dark:bg-dark-accent rounded-xl flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                    <IconComp className="text-primary dark:text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary dark:text-white">{course.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{course.desc}</p>
                    <p className="bg-secondary/10 dark:bg-secondary/20 text-secondary w-fit px-2 py-0.5 rounded-full text-xs font-bold mt-1.5">{course.price}</p>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-primary dark:group-hover:text-white transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

const CheckoutScreen = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Method, 2: QR Payment
    const [upiId, setUpiId] = useState(getStoredUPI());

    useEffect(() => {
        const handleUpdate = () => setUpiId(getStoredUPI());
        window.addEventListener('upiUpdated', handleUpdate);
        return () => window.removeEventListener('upiUpdated', handleUpdate);
    }, []);

    const paymentLink = `upi://pay?pa=${upiId}&pn=SmallCopper&am=20000&cu=INR`;

    return (
        <div className="min-h-screen pb-10 bg-bg-off-white dark:bg-dark-bg transition-colors duration-300">
             <header className="p-6 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-4">
                  <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-accent flex items-center justify-center shadow-sm transition-colors">
                      <ChevronRight className="rotate-180 dark:text-white" />
                  </button>
                  <h1 className="text-xl font-bold dark:text-white transition-colors">Secure Checkout</h1>
                </div>
                <DarkModeToggle />
             </header>

             <main className="px-6 space-y-8">
                {step === 1 ? (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg dark:text-white">Payment Method</h3>
                        <p className="text-sm text-gray-500">Choose your preferred UPI payment method.</p>
                        <div className="space-y-3">
                            <div 
                                onClick={() => setStep(2)}
                                className="p-5 rounded-2xl border-2 border-primary bg-accent/10 dark:bg-primary/20 dark:border-secondary flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                            >
                                <div className="w-5 h-5 rounded-full border-2 border-primary dark:border-secondary flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-primary dark:bg-secondary rounded-full"></div>
                                </div>
                                <div className="w-10 h-10 bg-accent/30 dark:bg-dark-accent rounded flex items-center justify-center dark:text-white"><QrCode size={20} /></div>
                                <div>
                                    <p className="font-bold dark:text-white">Pay with QR Code (Recommended)</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">GPay, PhonePe, Paytm supported</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-dark-accent shadow-sm space-y-4">
                        <h3 className="font-bold border-b pb-3 border-gray-100 dark:border-dark-accent dark:text-white">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">MERN Stack Mastery</span>
                                <span className="font-bold dark:text-white">₹20,000</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-dark-accent flex justify-between items-center">
                            <span className="text-xl font-bold dark:text-white">Total Amount</span>
                            <span className="text-2xl font-bold text-primary dark:text-secondary">₹20,000</span>
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => setStep(2)}>
                       Continue to Payment <ChevronRight size={18} />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center space-y-8 py-10">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold dark:text-white">Scan & Pay</h3>
                      <p className="text-gray-500 text-sm">Scan this QR code using any UPI app</p>
                      <p className="text-[10px] font-bold text-primary dark:text-secondary bg-primary/5 dark:bg-secondary/10 px-3 py-1 rounded-full w-fit mx-auto mt-2 tracking-wider">{upiId}</p>
                    </div>

                    <div className="bg-white p-6 rounded-[3rem] shadow-2xl relative">
                      <div className="w-64 h-64 bg-gray-50 rounded-[2rem] flex items-center justify-center border-4 border-primary/10">
                         <QrCode size={180} className="text-primary" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg">
                           <Logo />
                         </div>
                      </div>
                    </div>

                    <div className="space-y-4 w-full">
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                        <p className="text-xs text-yellow-800 dark:text-yellow-400 text-center font-medium">
                          Please do not refresh or close the page while the payment is in progress.
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-4">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Google_Pay_Logo.svg" className="h-6 opacity-60 dark:invert" alt="GPay" />
                           <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" className="h-6 opacity-60 dark:invert" alt="Paytm" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">Waiting for payment confirmation...</p>
                        <div className="w-24 h-1 bg-gray-100 dark:bg-dark-accent rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-secondary"
                            animate={{ x: [-100, 100] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => navigate('/success')}>
                         Simulate Successful Payment
                      </Button>
                    </div>
                  </motion.div>
                )}
             </main>
        </div>
    );
};

const SuccessScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-bg-off-white dark:bg-dark-bg flex items-center justify-center p-6 transition-colors duration-300">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-dark-card w-full max-w-sm rounded-[40px] p-8 shadow-xl dark:shadow-none space-y-6 text-center border border-gray-100 dark:border-dark-accent transition-colors duration-300"
            >
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/10 rounded-full flex items-center justify-center mx-auto transition-colors">
                    <CheckCircle2 className="text-green-500 w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-primary dark:text-white transition-colors">Payment Successful 🎉</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">You are now officially enrolled in <br /> <span className="font-bold text-primary dark:text-secondary italic">MERN Stack Mastery</span></p>
                </div>

                <div className="bg-accent/10 dark:bg-dark-accent/50 rounded-2xl p-6 space-y-3 text-sm transition-colors">
                    <div className="flex justify-between"><span className="text-gray-400 dark:text-gray-500">ORDER ID</span> <span className="font-bold dark:text-white">#COP-8492-XL</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 dark:text-gray-500">AMOUNT PAID</span> <span className="font-bold dark:text-white">₹20,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 dark:text-gray-500">DATE</span> <span className="font-bold dark:text-white">May 01, 2026</span></div>
                </div>

                <Button className="w-full" onClick={() => navigate('/home')}>
                    Go to Dashboard <ChevronRight size={20} />
                </Button>
            </motion.div>
        </div>
    );
}

const AdminScreen = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');
    const isAdmin = userEmail === 'admin@gmail.com';
    const [view, setView] = useState<'users' | 'courses' | 'settings'>('users');
    
    // Courses CRUD State
    const [courses, setCourses] = useState(getStoredCourses());
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [editingCourse, setEditingCourse] = useState<any>(null);
    const [newCourse, setNewCourse] = useState({ title: '', price: '₹', desc: '', icon: 'BookOpen' });

    // Settings State
    const [upiId, setUpiId] = useState(getStoredUPI());

    // Students state
    const [students, setStudents] = useState(getStoredStudents());

    useEffect(() => {
      if (!isAdmin) {
        navigate('/home');
      }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        const updated = [...courses, { ...newCourse, id: Date.now() }];
        setCourses(updated);
        saveStoredCourses(updated);
        setIsAddingCourse(false);
        setNewCourse({ title: '', price: '₹', desc: '', icon: 'BookOpen' });
    };

    const handleUpdateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        const updated = courses.map((c: any) => c.id === editingCourse.id ? editingCourse : c);
        setCourses(updated);
        saveStoredCourses(updated);
        setEditingCourse(null);
    };

    const handleDeleteCourse = (id: number) => {
        if (confirm("Are you sure you want to delete this course?")) {
            const updated = courses.filter((c: any) => c.id !== id);
            setCourses(updated);
            saveStoredCourses(updated);
        }
    };

    return (
        <div className="min-h-screen bg-bg-off-white dark:bg-dark-bg transition-colors duration-300">
            <header className="px-6 py-4 flex justify-between items-center bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-dark-accent fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-dark-bg/90">
                <div className="flex items-center gap-3">
                    <Logo className="w-8 h-8" />
                    <span className="font-bold text-primary dark:text-white text-xl tracking-tight">Admin Console</span>
                </div>
                <div className="flex gap-2 items-center">
                    <DarkModeToggle />
                    <button onClick={() => navigate('/home')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-accent/50 text-gray-600 dark:text-white hover:scale-105 transition-all shadow-sm">
                        <LogOut size={20}/>
                    </button>
                </div>
            </header>
            <div className="h-20" />

            <main className="p-6 space-y-8">
                <div className="flex bg-white dark:bg-dark-card p-1 rounded-2xl border border-gray-100 dark:border-dark-accent w-fit mx-auto shadow-sm">
                    <button 
                        onClick={() => setView('users')}
                        className={cn(
                            "px-8 py-2 rounded-xl font-bold text-sm transition-all",
                            view === 'users' ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-primary"
                        )}
                    >
                        Users
                    </button>
                    <button 
                        onClick={() => setView('courses')}
                        className={cn(
                            "px-8 py-2 rounded-xl font-bold text-sm transition-all",
                            view === 'courses' ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-primary"
                        )}
                    >
                        Courses
                    </button>
                    <button 
                        onClick={() => setView('settings')}
                        className={cn(
                            "px-8 py-2 rounded-xl font-bold text-sm transition-all",
                            view === 'settings' ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-primary"
                        )}
                    >
                        Settings
                    </button>
                </div>

                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-primary dark:text-white">
                            {view === 'users' ? 'Registered Users' : view === 'courses' ? 'Course Management' : 'System Settings'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {view === 'users' ? 'Manage enrollments and payment statuses.' : view === 'courses' ? 'Configure course pricing and metadata.' : 'Manage payments and application configurations.'}
                        </p>
                    </div>
                    {view === 'courses' && (
                        <button 
                            onClick={() => setIsAddingCourse(true)}
                            className="bg-secondary text-white p-3 rounded-2xl shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold"
                        >
                            <Plus size={20} /> Add Course
                        </button>
                    )}
                </div>

                {view === 'users' ? (
                    <div className="bg-white dark:bg-dark-card rounded-[32px] border border-gray-100 dark:border-dark-accent shadow-sm overflow-hidden divide-y divide-gray-50 dark:divide-dark-accent">
                        {students.length > 0 ? students.map((student: any, idx: number) => (
                            <div key={idx} className="p-5 flex items-center gap-4 hover:bg-gray-50/50 dark:hover:bg-dark-accent/10 transition-colors">
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg", student.color)}>
                                    {student.initials}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-primary dark:text-white leading-none">{student.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{student.course}</p>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                                    student.status === 'PAID' ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" :
                                    "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                )}>{student.status}</span>
                            </div>
                        )) : (
                            <div className="p-20 text-center space-y-2 opacity-50">
                                <User className="mx-auto w-12 h-12 text-gray-300" />
                                <p className="font-bold text-gray-400">No students registered yet</p>
                            </div>
                        )}
                    </div>
                ) : view === 'courses' ? (
                    <div className="grid gap-4">
                        {courses.map((course: any) => {
                            const IconComp = iconMap[course.icon] || BookOpen;
                            return (
                                <div key={course.id} className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-dark-accent shadow-sm flex justify-between items-center group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-accent/20 dark:bg-dark-accent rounded-xl flex items-center justify-center">
                                            <IconComp size={20} className="text-primary dark:text-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-primary dark:text-white">{course.title}</h4>
                                            <p className="text-xs text-gray-400 line-clamp-1">{course.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-secondary text-lg">{course.price}</p>
                                            <div className="flex gap-2 mt-1">
                                                <button 
                                                    onClick={() => setEditingCourse(course)}
                                                    className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:scale-110 transition-all"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCourse(course.id)}
                                                    className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:scale-110 transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-dark-card p-8 rounded-[32px] border border-gray-100 dark:border-dark-accent space-y-6">
                        <div className="space-y-4 max-w-md">
                            <h3 className="font-bold text-xl dark:text-white">Payment Settings</h3>
                            <Input 
                                label="Receiver UPI ID" 
                                placeholder="example@upi" 
                                value={upiId}
                                onChange={(e: any) => {
                                    setUpiId(e.target.value);
                                    saveStoredUPI(e.target.value);
                                }}
                                icon={CreditCard}
                            />
                            <p className="text-xs text-gray-400 italic">This UPI ID will be used to generate the payment QR code during checkout.</p>
                        </div>
                    </div>
                )}

                {/* Modals for Add/Edit */}
                <AnimatePresence>
                    {(isAddingCourse || editingCourse) && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-primary/10">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-dark-card w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl space-y-6 border border-gray-100 dark:border-dark-accent"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold dark:text-white">
                                        {isAddingCourse ? 'Add New Course' : 'Edit Course'}
                                    </h3>
                                    <button onClick={() => { setIsAddingCourse(false); setEditingCourse(null); }} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={isAddingCourse ? handleAddCourse : handleUpdateCourse} className="space-y-4">
                                    <Input 
                                        label="Course Title" 
                                        placeholder="e.g. MERN Stack Pro" 
                                        value={isAddingCourse ? newCourse.title : editingCourse.title}
                                        onChange={(e: any) => isAddingCourse 
                                            ? setNewCourse({ ...newCourse, title: e.target.value })
                                            : setEditingCourse({ ...editingCourse, title: e.target.value })
                                        }
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input 
                                            label="Price" 
                                            placeholder="₹20,000" 
                                            value={isAddingCourse ? newCourse.price : editingCourse.price}
                                            onChange={(e: any) => isAddingCourse 
                                                ? setNewCourse({ ...newCourse, price: e.target.value })
                                                : setEditingCourse({ ...editingCourse, price: e.target.value })
                                            }
                                            required
                                        />
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Icon</label>
                                            <select 
                                                className="w-full bg-accent/10 dark:bg-dark-accent/50 border border-gray-200 dark:border-transparent focus:bg-white dark:focus:bg-dark-card rounded-xl py-3 px-4 outline-none transition-all dark:text-white appearance-none"
                                                value={isAddingCourse ? newCourse.icon : editingCourse.icon}
                                                onChange={(e: any) => isAddingCourse 
                                                    ? setNewCourse({ ...newCourse, icon: e.target.value })
                                                    : setEditingCourse({ ...editingCourse, icon: e.target.value })
                                                }
                                            >
                                                {Object.keys(iconMap).map(k => <option key={k} value={k}>{k}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Description</label>
                                        <textarea 
                                            className="w-full bg-accent/10 dark:bg-dark-accent/50 border border-gray-200 dark:border-transparent focus:bg-white dark:focus:bg-dark-card rounded-xl py-3 px-4 outline-none transition-all dark:text-white min-h-[100px]"
                                            value={isAddingCourse ? newCourse.desc : editingCourse.desc}
                                            onChange={(e: any) => isAddingCourse 
                                                ? setNewCourse({ ...newCourse, desc: e.target.value })
                                                : setEditingCourse({ ...editingCourse, desc: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <Button className="w-full">
                                        {isAddingCourse ? 'Create Course' : 'Save Changes'}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/login" element={<RegistrationScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/success" element={<SuccessScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}
