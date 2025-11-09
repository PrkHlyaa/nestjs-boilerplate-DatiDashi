import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from '../../../../about/domain/about.entity';

@Injectable()
export class AboutSeedService {
  constructor(
    @InjectRepository(About)
    private repository: Repository<About>,
  ) {}

  async run() {
    // Check if we already have the 5 default sections
    const existingCount = await this.repository.count();

    // If we have less than 5, delete all and re-seed
    if (existingCount < 5 && existingCount > 0) {
      await this.repository.clear();
    }

    // Only skip if we already have 5 or more sections
    if (existingCount >= 5) {
      return;
    }

    const aboutData = [
      {
        title: 'Tentang DatiDashi',
        description:
          'DatiDashi adalah perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk meningkatkan efisiensi bisnis. Didirikan pada tahun 2020, kami telah melayani lebih dari 100+ klien dari berbagai industri dengan solusi custom yang disesuaikan dengan kebutuhan mereka.',
        section: 'about',
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        order: 1,
        isActive: true,
      },
      {
        title: 'Visi Kami',
        description:
          'Menjadi pemimpin dalam inovasi teknologi digital di Indonesia, memberikan solusi terbaik yang mendorong transformasi digital dan pertumbuhan berkelanjutan bagi setiap klien kami.',
        section: 'vision',
        imageUrl:
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800',
        order: 2,
        isActive: true,
      },
      {
        title: 'Misi Kami',
        description:
          'Mengembangkan produk dan layanan teknologi berkualitas tinggi yang dapat diakses, terjangkau, dan berdampak positif bagi perkembangan bisnis klien. Kami berkomitmen untuk terus berinovasi dan memberikan pengalaman terbaik.',
        section: 'mission',
        imageUrl:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        order: 3,
        isActive: true,
      },
      {
        title: 'Sejarah Perusahaan',
        description:
          'Berawal dari sebuah startup kecil dengan 3 orang founder di tahun 2020, DatiDashi kini telah berkembang menjadi perusahaan teknologi dengan tim lebih dari 50 profesional berpengalaman. Kami telah menangani berbagai proyek berskala nasional dan internasional.',
        section: 'history',
        imageUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        order: 4,
        isActive: true,
      },
      {
        title: 'Nilai-Nilai Kami',
        description:
          'Inovasi, Integritas, dan Kolaborasi adalah tiga pilar utama kami. Kami percaya bahwa kesuksesan datang dari kerja sama tim yang solid, kejujuran dalam setiap tindakan, dan keberanian untuk terus berinovasi menghadapi tantangan.',
        section: 'values',
        imageUrl:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
        order: 5,
        isActive: true,
      },
    ];

    await this.repository.save(aboutData);
  }
}
