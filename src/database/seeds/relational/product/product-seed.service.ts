import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../../products/domain/product.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          judul: 'Enterprise Resource Planning (ERP) System',
          deskripsi:
            'Sistem ERP terintegrasi yang dirancang khusus untuk mengoptimalkan operasional bisnis Anda. Mencakup manajemen inventori, keuangan, SDM, dan supply chain dalam satu platform yang mudah digunakan. Dilengkapi dengan dashboard analytics real-time dan reporting otomatis.',
          jumlah: 15,
        }),
        this.repository.create({
          judul: 'Customer Relationship Management (CRM) Platform',
          deskripsi:
            'Platform CRM yang powerful untuk mengelola hubungan pelanggan dan meningkatkan penjualan. Fitur meliputi lead tracking, sales pipeline management, customer analytics, email automation, dan integrasi dengan berbagai tools marketing. Cocok untuk bisnis skala menengah hingga enterprise.',
          jumlah: 28,
        }),
        this.repository.create({
          judul: 'E-Commerce Solution Package',
          deskripsi:
            'Solusi e-commerce lengkap dengan fitur marketplace, payment gateway integration, inventory management, dan customer analytics. Dilengkapi dengan mobile app iOS & Android, admin panel yang user-friendly, dan sistem promosi yang fleksibel. Ready untuk scale hingga jutaan transaksi.',
          jumlah: 12,
        }),
        this.repository.create({
          judul: 'Mobile Application Development',
          deskripsi:
            'Layanan pengembangan aplikasi mobile native untuk iOS dan Android atau cross-platform menggunakan React Native/Flutter. Termasuk UI/UX design, development, testing, deployment, dan maintenance. Cocok untuk startup hingga enterprise yang ingin hadir di mobile platform.',
          jumlah: 20,
        }),
        this.repository.create({
          judul: 'Cloud Migration & Infrastructure Services',
          deskripsi:
            'Layanan migrasi sistem on-premise ke cloud (AWS, Google Cloud, Azure) dengan zero downtime. Termasuk infrastruktur setup, security configuration, auto-scaling, monitoring, dan 24/7 support. Hemat biaya operasional hingga 40% dengan performa lebih baik.',
          jumlah: 8,
        }),
        this.repository.create({
          judul: 'Business Intelligence & Analytics Dashboard',
          deskripsi:
            'Dashboard analytics interaktif untuk visualisasi data bisnis real-time. Integrasi dengan berbagai sumber data, custom reports, predictive analytics menggunakan machine learning, dan mobile access. Bantu pengambilan keputusan berbasis data yang akurat.',
          jumlah: 18,
        }),
      ]);
    }
  }
}
