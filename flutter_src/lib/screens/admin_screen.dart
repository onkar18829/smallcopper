import 'package:flutter/material.dart';

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Small Copper Academy", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none)),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Registered Users", style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E))),
            const Text("Manage enrollments and payment statuses.", style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                   _FilterChip(label: "All Courses", isActive: true),
                   _FilterChip(label: "Cybersecurity"),
                   _FilterChip(label: "UI/UX Design"),
                   _FilterChip(label: "Digital Marketing"),
                   _FilterChip(label: "Full Stack Java"),
                   _FilterChip(label: "Mobile Development"),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.grey[100]!),
              ),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: 4,
                separatorBuilder: (context, index) => Divider(height: 1, color: Colors.grey[50]!),
                itemBuilder: (context, index) {
                  final students = [
                    {'name': 'Eleanor Shellstrop', 'course': 'Foundations of Design', 'status': 'PAID', 'color': Colors.blue},
                    {'name': 'Chidi Anagonye', 'course': 'Advanced Typography', 'status': 'PENDING', 'color': Colors.orange},
                    {'name': 'Tahani Al-Jamil', 'course': 'UX Research Methods', 'status': 'OVERDUE', 'color': Colors.red},
                    {'name': 'Jianyu Mendoza', 'course': 'Foundations of Design', 'status': 'PAID', 'color': Colors.blue},
                  ];
                  final student = students[index];

                  return ListTile(
                    contentPadding: const EdgeInsets.all(16),
                    leading: CircleAvatar(
                      backgroundColor: (student['color'] as Color).withOpacity(0.1),
                      child: Text((student['name'] as String).substring(0, 2).toUpperCase(), style: TextStyle(color: student['color'] as Color, fontWeight: FontWeight.bold)),
                    ),
                    title: Text(student['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(student['course'] as String, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: (student['color'] as Color).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            student['status'] as String, 
                            style: TextStyle(color: student['color'] as Color, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: TextButton(
                onPressed: () {},
                child: const Text("Load More Users", style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0B2B5E))),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool isActive;
  const _FilterChip({required this.label, this.isActive = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF0B2B5E) : const Color(0xFFDDE6F9).withOpacity(0.3),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isActive ? Colors.white : const Color(0xFF0B2B5E),
            fontWeight: FontWeight.bold,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}
