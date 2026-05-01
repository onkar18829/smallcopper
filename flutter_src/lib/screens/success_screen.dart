import 'package:flutter/material.dart';

class PaymentSuccess extends StatelessWidget {
  const PaymentSuccess({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black.withOpacity(0.4),
      body: Center(
        child: Container(
          margin: const EdgeInsets.all(24),
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(40),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircleAvatar(
                radius: 40,
                backgroundColor: Color(0xFFE8F5E9),
                child: Icon(Icons.check_circle, color: Colors.green, size: 50),
              ),
              const SizedBox(height: 24),
              const Text("Payment Successful 🎉", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E))),
              const SizedBox(height: 8),
              const Text(
                "You are now officially enrolled in the course. Your learning journey begins now.",
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 32),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: const Color(0xFFDDE6F9).withOpacity(0.3),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Column(
                  children: [
                    _RowItem(label: "ORDER ID", value: "#COP-8492-XL"),
                    SizedBox(height: 12),
                    _RowItem(label: "AMOUNT PAID", value: "₹20,000"),
                    SizedBox(height: 12),
                    _RowItem(label: "DATE", value: "Oct 24, 2026"),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).popUntil((route) => route.isFirst);
                  },
                   style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFA65215),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text("Go to Dashboard", style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RowItem extends StatelessWidget {
  final String label;
  final String value;
  const _RowItem({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(fontSize: 10, color: Colors.grey, fontWeight: FontWeight.bold, letterSpacing: 1)),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
      ],
    );
  }
}
