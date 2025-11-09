import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../../../../features/domain/feature.entity';

@Injectable()
export class FeatureSeedService {
  constructor(
    @InjectRepository(Feature)
    private repository: Repository<Feature>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          name: 'Scalable Architecture',
          description:
            'Sistem dirancang untuk scale otomatis sesuai kebutuhan bisnis Anda. Dapat menangani hingga jutaan users tanpa penurunan performa.',
          icon: 'fa-expand-arrows-alt',
        }),
        this.repository.create({
          name: 'Enterprise Security',
          description:
            'Keamanan tingkat enterprise dengan enkripsi end-to-end, two-factor authentication, regular security audits, dan compliance dengan standar internasional.',
          icon: 'fa-shield-alt',
        }),
        this.repository.create({
          name: '24/7 Technical Support',
          description:
            'Tim support dedicated kami siap membantu 24/7 melalui berbagai channel: phone, email, live chat, dan ticketing system dengan SLA response time terjamin.',
          icon: 'fa-headset',
        }),
        this.repository.create({
          name: 'Cloud-Native Technology',
          description:
            'Dibangun dengan teknologi cloud-native modern seperti microservices, containerization (Docker/Kubernetes), dan serverless untuk efisiensi maksimal.',
          icon: 'fa-cloud',
        }),
        this.repository.create({
          name: 'Real-time Analytics',
          description:
            'Dashboard analytics real-time dengan visualisasi data interaktif, custom reports, dan predictive insights menggunakan machine learning.',
          icon: 'fa-chart-line',
        }),
        this.repository.create({
          name: 'API-First Approach',
          description:
            'RESTful API yang well-documented dengan Swagger/OpenAPI, webhooks support, dan easy integration dengan third-party services.',
          icon: 'fa-plug',
        }),
        this.repository.create({
          name: 'Mobile-First Design',
          description:
            'UI/UX responsive yang dioptimalkan untuk mobile devices, progressive web app (PWA) ready, dan native mobile apps untuk iOS & Android.',
          icon: 'fa-mobile-alt',
        }),
        this.repository.create({
          name: 'Automated DevOps',
          description:
            'CI/CD pipeline otomatis, automated testing, deployment dengan zero downtime, dan monitoring infrastructure yang comprehensive.',
          icon: 'fa-robot',
        }),
      ]);
    }
  }
}
