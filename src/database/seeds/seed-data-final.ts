import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export async function seedData(dataSource: DataSource) {
  // 0. USER ADMIN
  console.log('Seeding admin user...');
  const passwordHash = await bcrypt.hash('admin123', 10);

  await dataSource.query(`
    INSERT INTO "user" (id, email, password, provider, "firstName", "lastName", "roleId", "statusId", "createdAt", "updatedAt")
    VALUES 
    (1, 'admin@example.com', '${passwordHash}', 'email', 'Admin', 'User', 1, 1, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET 
      email = EXCLUDED.email,
      password = EXCLUDED.password,
      "firstName" = EXCLUDED."firstName",
      "lastName" = EXCLUDED."lastName",
      "roleId" = EXCLUDED."roleId",
      "statusId" = EXCLUDED."statusId",
      "updatedAt" = NOW();
  `);

  // 1. PRODUCTS (jumlah, judul, deskripsi)
  console.log('Seeding products...');
  await dataSource.query(`
    INSERT INTO products (id, jumlah, judul, deskripsi)
    VALUES 
    ('650e8400-e29b-41d4-a716-446655440001', 150, 'Enterprise Web Portal', 'Solusi portal web enterprise yang powerful dan scalable untuk mengelola operasional bisnis Anda. Dilengkapi dengan dashboard analytics, user management, role-based access control, API integration, real-time notifications, dan tampilan mobile responsive yang modern.'),
    ('650e8400-e29b-41d4-a716-446655440002', 120, 'E-Commerce Platform', 'Platform e-commerce lengkap dengan fitur product catalog, shopping cart, payment gateway integration, order management, inventory system, dan customer reviews. Mendukung multi-vendor dan multi-currency untuk ekspansi bisnis yang lebih luas.'),
    ('650e8400-e29b-41d4-a716-446655440003', 80, 'Learning Management System', 'Platform pembelajaran online yang interaktif dengan fitur video streaming, quiz & assignments, progress tracking, discussion forum, certificate generation, dan mobile app. Cocok untuk institusi pendidikan dan corporate training dengan dashboard yang komprehensif.'),
    ('650e8400-e29b-41d4-a716-446655440004', 20, 'Hospital Management System', 'Sistem informasi rumah sakit terintegrasi yang mencakup patient registration, electronic medical records, appointment scheduling, billing system, pharmacy management, dan lab integration. Membantu efisiensi operasional rumah sakit dengan digitalisasi penuh.'),
    ('650e8400-e29b-41d4-a716-446655440005', 65, 'HR Management System', 'Solusi HRIS lengkap untuk mengelola employee database, payroll management, attendance tracking, performance review, recruitment, dan leave management dalam satu platform terintegrasi yang mudah digunakan oleh tim HR.'),
    ('650e8400-e29b-41d4-a716-446655440006', 45, 'Restaurant POS System', 'Sistem Point of Sale khusus untuk restoran dengan fitur order management, kitchen display system, table management, payment integration, menu management, dan sales report real-time. Meningkatkan efisiensi operasional restoran hingga 40%.'),
    ('650e8400-e29b-41d4-a716-446655440007', 55, 'Inventory Management System', 'Sistem manajemen inventori yang efisien untuk tracking stock, purchase orders, warehouse management, barcode scanning, stock alerts, dan multi-location support dengan real-time updates untuk mengoptimalkan supply chain bisnis Anda.'),
    ('650e8400-e29b-41d4-a716-446655440008', 70, 'Customer Relationship Management', 'CRM platform untuk mengelola contact management, sales pipeline, marketing automation, customer support, analytics dashboard, dan email integration. Meningkatkan customer satisfaction dan sales conversion rate hingga 35%.'),
    ('650e8400-e29b-41d4-a716-446655440009', 90, 'Project Management System', 'Platform manajemen proyek dengan fitur task management, gantt charts, time tracking, resource planning, team collaboration, dan comprehensive reporting untuk memastikan proyek selesai tepat waktu dan sesuai budget.'),
    ('650e8400-e29b-41d4-a716-446655440010', 10, 'Mobile App Development', 'Layanan pengembangan aplikasi mobile native (iOS & Android) atau cross-platform dengan modern design, optimal performance, UI/UX design, API integration, push notifications, dan app store deployment assistance.')
    ON CONFLICT (id) DO UPDATE SET jumlah = EXCLUDED.jumlah, judul = EXCLUDED.judul, deskripsi = EXCLUDED.deskripsi;
  `);

  // 2. ORGANIZATION MEMBERS (name, position, photoUrl, order)
  console.log('Seeding organization members...');
  await dataSource.query(`
    INSERT INTO organization_members (id, name, position, "photoUrl", "order", "createdAt", "updatedAt")
    VALUES 
    ('750e8400-e29b-41d4-a716-446655440001', 'Budi Santoso', 'CEO & Founder', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face', 1, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440002', 'Siti Nurhaliza', 'CTO', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face', 2, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440003', 'Ahmad Wijaya', 'COO', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face', 3, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440004', 'Rina Kusuma', 'CFO', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face', 4, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440005', 'Dedy Prasetyo', 'Lead Backend Developer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', 5, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440006', 'Wulandari', 'Lead Frontend Developer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', 6, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440007', 'Rizky Firmansyah', 'Lead Mobile Developer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', 7, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440008', 'Maya Anggraini', 'Lead UI/UX Designer', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', 8, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440009', 'Andi Hermawan', 'DevOps Engineer', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', 9, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440010', 'Putri Rahayu', 'Product Manager', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face', 10, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440011', 'Farhan Maulana', 'QA Engineer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', 11, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440012', 'Linda Sari', 'Security Engineer', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face', 12, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440013', 'Bambang Suprapto', 'Backend Developer', 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=face', 13, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440014', 'Nadia Safitri', 'Frontend Developer', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face', 14, NOW(), NOW()),
    ('750e8400-e29b-41d4-a716-446655440015', 'Hendra Gunawan', 'Customer Success Manager', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face', 15, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, position = EXCLUDED.position, "photoUrl" = EXCLUDED."photoUrl", "order" = EXCLUDED."order", "updatedAt" = NOW();
  `);

  // 3. FEATURES (name, description, icon)
  console.log('Seeding features...');
  await dataSource.query(`
    INSERT INTO features (id, name, description, icon, "createdAt", "updatedAt")
    VALUES 
    ('850e8400-e29b-41d4-a716-446655440001', 'Modern Technology Stack', 'Menggunakan teknologi terkini seperti NestJS, React, Vue.js, TypeScript, dan PostgreSQL untuk membangun aplikasi yang powerful, maintainable, dan scalable dengan best practices industry.', 'code', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440002', 'Cloud-Native Architecture', 'Aplikasi dirancang dengan arsitektur cloud-native yang dapat di-deploy di AWS, Azure, atau Google Cloud Platform dengan auto-scaling dan high availability untuk performa optimal.', 'cloud', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440003', 'Enterprise-Grade Security', 'Implementasi security terbaik dengan encryption, authentication, authorization, regular security audits, dan compliance dengan standar internasional seperti ISO 27001 dan GDPR.', 'shield', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440004', 'Mobile Responsive Design', 'Semua aplikasi dibuat dengan pendekatan mobile-first design yang memberikan user experience optimal di berbagai devices mulai dari smartphone hingga desktop.', 'mobile', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440005', '24/7 Support & Maintenance', 'Tim support kami siap membantu Anda kapan saja dengan response time maksimal 2 jam untuk critical issues dan regular maintenance untuk memastikan sistem berjalan lancar.', 'support', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440006', 'Agile Development', 'Menggunakan metodologi Agile/Scrum dengan sprint 2 minggu, daily standup, dan regular demo untuk memastikan transparansi dan delivery yang cepat sesuai kebutuhan bisnis.', 'agile', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440007', 'API Integration', 'Kemampuan integrasi dengan berbagai third-party services seperti payment gateways, shipping providers, social media APIs, dan enterprise systems melalui RESTful API atau GraphQL.', 'api', NOW(), NOW()),
    ('850e8400-e29b-41d4-a716-446655440008', 'Advanced Analytics', 'Dashboard analytics komprehensif dengan real-time metrics, customizable reports, data visualization, dan business intelligence untuk data-driven decision making.', 'chart', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon, "updatedAt" = NOW();
  `);

  // 4. PRICINGS (name, description, price, period, features)
  console.log('Seeding pricings...');
  await dataSource.query(`
    INSERT INTO pricings (id, name, description, price, period, features, "createdAt", "updatedAt")
    VALUES 
    ('950e8400-e29b-41d4-a716-446655440001', 'Starter Package', 'Paket ideal untuk memulai transformasi digital bisnis Anda dengan website company profile profesional', 25000000.00, 'one-time', '["Website Company Profile", "Responsive Design", "5 Pages", "Contact Form", "SEO Basic", "1 Bulan Support"]'::json, NOW(), NOW()),
    ('950e8400-e29b-41d4-a716-446655440002', 'Professional Package', 'Solusi lengkap untuk perusahaan yang membutuhkan custom web application dengan fitur kompleks', 75000000.00, 'one-time', '["Custom Web Application", "Admin Dashboard", "Database Integration", "RESTful API", "Authentication", "3 Bulan Support", "Hosting Setup"]'::json, NOW(), NOW()),
    ('950e8400-e29b-41d4-a716-446655440003', 'Enterprise Package', 'Paket enterprise dengan arsitektur scalable untuk perusahaan besar dengan kebutuhan sistem terintegrasi', 99999999.99, 'one-time', '["Full-Stack Application", "Microservices Architecture", "Cloud Deployment", "CI/CD Pipeline", "Load Balancing", "Advanced Security", "6 Bulan Support", "Training Team"]'::json, NOW(), NOW()),
    ('950e8400-e29b-41d4-a716-446655440004', 'Maintenance Package', 'Paket maintenance bulanan untuk menjaga sistem tetap optimal dan aman', 5000000.00, 'month', '["Bug Fixes", "Security Updates", "Performance Monitoring", "24/7 Support", "Regular Backups", "Monthly Reports"]'::json, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, period = EXCLUDED.period, features = EXCLUDED.features, "updatedAt" = NOW();
  `);

  // 5. ABOUT SECTIONS (title, description, section, imageUrl, order, isActive)
  console.log('Seeding about sections...');
  await dataSource.query(`
    INSERT INTO abouts (id, title, description, section, "imageUrl", "order", "isActive", "createdAt", "updatedAt")
    VALUES 
    ('a50e8400-e29b-41d4-a716-446655440001', 'Tentang Kami', 'DatiDashi adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk bisnis. Dengan pengalaman lebih dari 10 tahun, kami telah membantu ratusan perusahaan bertransformasi digital dan meningkatkan efisiensi operasional mereka. Tim kami terdiri dari para ahli yang passionate di bidang software development, cloud computing, dan digital transformation.', 'about', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop', 1, true, NOW(), NOW()),
    ('a50e8400-e29b-41d4-a716-446655440002', 'Visi Kami', 'Menjadi mitra teknologi terpercaya yang memberdayakan bisnis melalui solusi digital inovatif dan transformasi teknologi yang berkelanjutan. Kami berkomitmen untuk selalu berada di garis depan inovasi teknologi dan memberikan nilai maksimal kepada setiap klien kami.', 'vision', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop', 2, true, NOW(), NOW()),
    ('a50e8400-e29b-41d4-a716-446655440003', 'Misi Kami', 'Menghadirkan solusi teknologi berkualitas tinggi yang disesuaikan dengan kebutuhan unik setiap klien. Kami fokus pada pengembangan sistem yang scalable, secure, dan user-friendly dengan dukungan after-sales yang excellent. Komitmen kami adalah membantu bisnis tumbuh melalui teknologi yang tepat.', 'mission', 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&auto=format&fit=crop', 3, true, NOW(), NOW()),
    ('a50e8400-e29b-41d4-a716-446655440004', 'Sejarah Perusahaan', 'Didirikan pada tahun 2014, DatiDashi dimulai dari tim kecil dengan visi besar untuk mengubah landscape teknologi Indonesia. Dari proyek pertama kami yang sederhana hingga kini menangani sistem enterprise skala besar, perjalanan kami dipenuhi dengan pembelajaran, inovasi, dan dedikasi untuk excellence. Kini kami bangga melayani 200+ klien dari berbagai industri.', 'history', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop', 4, true, NOW(), NOW()),
    ('a50e8400-e29b-41d4-a716-446655440005', 'Nilai-Nilai Kami', 'Innovation - Kami selalu mencari cara baru dan lebih baik. Quality - Setiap line of code ditulis dengan standar tertinggi. Integrity - Transparansi dan kejujuran dalam setiap interaksi. Collaboration - Bekerja sama dengan klien sebagai partner, bukan vendor. Customer Focus - Kesuksesan klien adalah prioritas utama kami.', 'values', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop', 5, true, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, section = EXCLUDED.section, "imageUrl" = EXCLUDED."imageUrl", "order" = EXCLUDED."order", "isActive" = EXCLUDED."isActive", "updatedAt" = NOW();
  `);

  console.log('✅ All data seeded successfully!');
}
