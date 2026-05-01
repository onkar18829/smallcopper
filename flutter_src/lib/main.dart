import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const CopperStackAcademy());
}

class CopperStackAcademy extends StatelessWidget {
  const CopperStackAcademy({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Small Copper Academy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0B2B5E),
          primary: const Color(0xFF0B2B5E),
          secondary: const Color(0xFFA65215),
          surface: const Color(0xFFF8FAFC),
        ),
        textTheme: GoogleFonts.interTextTheme(),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      ),
      home: const SplashScreen(),
    );
  }
}
