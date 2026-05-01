import 'package:flutter/material.dart';
import 'success_screen.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  int _paymentGroup = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Secure Checkout", style: TextStyle(fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Payment Method", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            
            _PaymentOption(
              value: 0, 
              group: _paymentGroup, 
              onChanged: (v) => setState(() => _paymentGroup = v!),
              title: "UPI (GPay, PhonePe, Paytm)",
              subtitle: "Pay instantly via any UPI app",
              icon: Icons.qr_code_scanner,
            ),
            const SizedBox(height: 12),
            _PaymentOption(
              value: 1, 
              group: _paymentGroup, 
              onChanged: (v) => setState(() => _paymentGroup = v!),
              title: "Debit / Credit Card",
              subtitle: "Secure card payments",
              icon: Icons.credit_card,
            ),

            if (_paymentGroup == 1) ...[
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.grey[200]!),
                ),
                child: const Column(
                  children: [
                    _CheckoutInput(label: "CARD NUMBER", hint: "0000 0000 0000 0000"),
                    SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(child: _CheckoutInput(label: "EXPIRY DATE", hint: "MM/YY")),
                        SizedBox(width: 16),
                        Expanded(child: _CheckoutInput(label: "CVV", hint: "123")),
                      ],
                    ),
                    SizedBox(height: 16),
                    _CheckoutInput(label: "NAME ON CARD", hint: "John Doe"),
                  ],
                ),
              ),
            ],

            const SizedBox(height: 32),
            const Text("Order Summary", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24)),
              child: const Column(
                children: [
                  _SummaryRow(label: "Course Name", value: "MERN Stack"),
                  _SummaryRow(label: "Platform Fee", value: "Free", valueColor: Colors.green),
                  _SummaryRow(label: "GST", value: "₹0"),
                  Divider(height: 32),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Total Amount", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      Text("₹20,000", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E))),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 60,
              child: ElevatedButton.icon(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const PaymentSuccess())),
                icon: const Icon(Icons.lock_outline),
                label: const Text("Pay Now", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFA65215),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PaymentOption extends StatelessWidget {
  final int value;
  final int group;
  final Function(int?) onChanged;
  final String title;
  final String subtitle;
  final IconData icon;

  const _PaymentOption({required this.value, required this.group, required this.onChanged, required this.title, required this.subtitle, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: value == group ? const Color(0xFFDDE6F9).withOpacity(0.2) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: value == group ? const Color(0xFF0B2B5E) : Colors.grey[200]!, width: 1.5),
      ),
      child: RadioListTile<int>(
        value: value,
        groupValue: group,
        onChanged: onChanged,
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        secondary: Icon(icon, color: const Color(0xFF0B2B5E)),
      ),
    );
  }
}

class _CheckoutInput extends StatelessWidget {
  final String label;
  final String hint;

  const _CheckoutInput({required this.label, required this.hint});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 4),
        TextField(
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(color: Colors.grey[300]),
            isDense: true,
            border: const UnderlineInputBorder(),
          ),
        ),
      ],
    );
  }
}

class _SummaryRow extends StatelessWidget {
  final String label;
  final String value;
  final Color? valueColor;

  const _SummaryRow({required this.label, required this.value, this.valueColor});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          Text(value, style: TextStyle(fontWeight: FontWeight.bold, color: valueColor)),
        ],
      ),
    );
  }
}
