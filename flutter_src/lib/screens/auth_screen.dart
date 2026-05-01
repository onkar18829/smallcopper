import 'package:flutter/material.dart';
import 'home_screen.dart';

class RegistrationScreen extends StatefulWidget {
  const RegistrationScreen({super.key});

  @override
  State<RegistrationScreen> createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                   Container(
                     padding: const EdgeInsets.all(8),
                     decoration: BoxDecoration(
                        color: const Color(0xFFA65215),
                        borderRadius: BorderRadius.circular(8),
                     ),
                     child: const Icon(Icons.school, color: Colors.white, size: 24),
                   ),
                   const SizedBox(width: 12),
                   const Text(
                     "Small Copper",
                     style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                   ),
                ],
              ),
              const SizedBox(height: 40),
              const Text(
                "Create an account",
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E)),
              ),
              const Text(
                "Join Small Copper to start your journey.",
                style: TextStyle(color: Colors.grey, fontSize: 16),
              ),
              const SizedBox(height: 32),
              
              const _CustomField(label: "Full Name", icon: Icons.person_outline, hint: "Jane Doe"),
              const SizedBox(height: 16),
              
              const Text("Phone Number", style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    height: 56,
                    width: 70,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: const Color(0xFFDDE6F9).withOpacity(0.3),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.transparent),
                    ),
                    child: const Text("+91", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(width: 8),
                  const Expanded(child: _CustomField(icon: Icons.phone_outlined, hint: "98765 43210")),
                ],
              ),
              const SizedBox(height: 16),

              const _CustomField(label: "Email Address", icon: Icons.mail_outline, hint: "jane@example.com"),
              const SizedBox(height: 16),
              
              const _CustomField(label: "College Name", icon: Icons.business_outlined, hint: "Enter your college"),
              const SizedBox(height: 16),

              const Text("Password", style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 8),
              TextField(
                obscureText: _obscureText,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_obscureText ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscureText = !_obscureText),
                  ),
                  hintText: "••••••••",
                  filled: true,
                  fillColor: const Color(0xFFDDE6F9).withOpacity(0.3),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    // Send OTP to Email Logic
                    Navigator.push(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFA65215),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text("Submit Registration", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.g_mobiledata, size: 32),
                  label: const Text("Continue with Google"),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFFDDE6F9)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Center(
                child: TextButton(
                  onPressed: () {},
                  child: RichText(
                    text: const TextSpan(
                      text: "Already have an account? ",
                      style: TextStyle(color: Colors.grey),
                      children: [
                        TextSpan(text: "Log in here", style: TextStyle(color: Color(0xFF0B2B5E), fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CustomField extends StatelessWidget {
  final String? label;
  final IconData? icon;
  final String hint;

  const _CustomField({this.label, this.icon, required this.hint});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) Text(label!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
        if (label != null) const SizedBox(height: 8),
        TextField(
          decoration: InputDecoration(
            prefixIcon: icon != null ? Icon(icon) : null,
            hintText: hint,
            filled: true,
            fillColor: const Color(0xFFDDE6F9).withOpacity(0.3),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
