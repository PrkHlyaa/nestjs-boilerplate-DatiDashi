import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricing } from '../../../../pricings/domain/pricing.entity';

@Injectable()
export class PricingSeedService {
  constructor(
    @InjectRepository(Pricing)
    private repository: Repository<Pricing>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          name: 'Starter Plan',
          description: 'Perfect for small businesses and startups',
          price: 5000000,
          period: 'project',
          features: [
            'Website Responsive (up to 5 pages)',
            'Basic SEO Optimization',
            'Mobile-friendly Design',
            'Contact Form Integration',
            'Google Analytics Setup',
            '1 Month Free Support',
            'Free SSL Certificate',
            'Basic Performance Optimization',
          ],
        }),
        this.repository.create({
          name: 'Professional Plan',
          description: 'Ideal for growing businesses with custom needs',
          price: 15000000,
          period: 'project',
          features: [
            'Custom Web Application Development',
            'Database Design & Implementation',
            'RESTful API Development',
            'Admin Dashboard',
            'User Authentication & Authorization',
            'Payment Gateway Integration',
            '3 Months Free Support',
            'Free Hosting for 1 Year',
            'Advanced SEO & Performance',
            'Email Notification System',
          ],
        }),
        this.repository.create({
          name: 'Enterprise Plan',
          description: 'Complete solution for large organizations',
          price: 50000000,
          period: 'project',
          features: [
            'Full Stack Development (Web + Mobile)',
            'Microservices Architecture',
            'Cloud Infrastructure Setup (AWS/GCP/Azure)',
            'Advanced Analytics Dashboard',
            'Third-party API Integrations',
            'CI/CD Pipeline Configuration',
            'Load Balancing & Auto Scaling',
            '6 Months Free Support',
            'Free Hosting & Maintenance for 1 Year',
            'Dedicated Project Manager',
            'Security Audit & Penetration Testing',
            'Training & Documentation',
          ],
        }),
        this.repository.create({
          name: 'Custom Solution',
          description: 'Tailored specifically to your business requirements',
          price: 0,
          period: 'negotiable',
          features: [
            'Fully Customized to Your Needs',
            'Dedicated Development Team',
            'Agile Development Methodology',
            'Regular Sprint Reviews',
            'Scalable Architecture',
            'Enterprise-grade Security',
            'Lifetime Support Options',
            'SLA Guarantee',
            'On-premise or Cloud Deployment',
            'Integration with Existing Systems',
          ],
        }),
      ]);
    }
  }
}
