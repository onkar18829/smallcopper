import 'package:flutter/material.dart';
import 'checkout_screen.dart';
import 'admin_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    // In a real app, this would come from a user state/provider
    String userEmail = "rahul@gmail.com"; 
    String userName = userEmail.split('@')[0];
    userName = userName[0].toUpperCase() + userName.substring(1);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const CircleAvatar(
              backgroundColor: Color(0xFF0B2B5E),
              child: Icon(Icons.person, color: Colors.white),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Small Copper", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey[600])),
                const Text("ACADEMY", style: TextStyle(fontSize: 10, letterSpacing: 2)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none)),
          IconButton(
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AdminDashboard())), 
            icon: const Icon(Icons.admin_panel_settings_outlined)
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Hello, $userName", style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E))),
            const Text("Ready to continue your learning journey?", style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            
            // Hero Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFF0B2B5E),
                borderRadius: BorderRadius.circular(32),
                boxShadow: [
                  BoxShadow(color: const Color(0xFF0B2B5E).withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10)),
                ],
              ),
              child: Stack(
                children: [
                  Positioned(
                    right: -40,
                    bottom: -40,
                    child: Icon(Icons.school, size: 150, color: Colors.white.withOpacity(0.05)),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Upgrade your skills today", style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      const Text("Unlock premium courses and accelerate your career.", style: TextStyle(color: Colors.white70)),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFA65215),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        ),
                        child: const Text("Explore Premium"),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Popular Courses", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                TextButton(onPressed: () {}, child: const Text("VIEW ALL", style: TextStyle(color: Color(0xFF0B2B5E), fontWeight: FontWeight.bold, fontSize: 12))),
              ],
            ),
            const SizedBox(height: 16),
            
            const _CourseCard(title: "MERN Stack", subtitle: "Full Stack Development", price: "₹20,000"),
            const _CourseCard(title: "Full Stack with Python", subtitle: "Django & Frameworks", price: "₹20,000"),
            const _CourseCard(title: "Cybersecurity", subtitle: "Ethical Hacking & Security", price: "₹20,000"),
            const _CourseCard(title: "UI/UX Design", subtitle: "User Experience Design", price: "₹20,000"),
            const _CourseCard(title: "Digital Marketing", subtitle: "Social Media & SEO", price: "₹20,000"),
            const _CourseCard(title: "Full Stack with Java", subtitle: "Spring Boot & Enterprise", price: "₹20,000"),
            const _CourseCard(title: "Mobile Development", subtitle: "Flutter & Cross-platform", price: "₹20,000"),
          ],
        ),
      ),
    );
  }
}

class _CourseCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String price;

  const _CourseCard({required this.title, required this.subtitle, required this.price});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: InkWell(
        onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CheckoutScreen())),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.grey[100]!),
          ),
          child: Row(
            children: [
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(color: const Color(0xFFDDE6F9), borderRadius: BorderRadius.circular(16)),
                child: const Icon(Icons.laptop, color: Color(0xFF0B2B5E)),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    const SizedBox(height: 8),
                    Text(price, style: const TextStyle(color: Color(0xFF0B2B5E), fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: Colors.grey),
            ],
          ),
        ),
      ),
    );
  }
}
