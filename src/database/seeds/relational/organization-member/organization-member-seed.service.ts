import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationMember } from '../../../../organization-members/domain/organization-member.entity';

@Injectable()
export class OrganizationMemberSeedService {
  constructor(
    @InjectRepository(OrganizationMember)
    private repository: Repository<OrganizationMember>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          name: 'Rizki Pratama',
          position: 'CEO & Founder',
          photoUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        }),
        this.repository.create({
          name: 'Sarah Kusuma',
          position: 'Chief Technology Officer',
          photoUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
        }),
        this.repository.create({
          name: 'Budi Santoso',
          position: 'Head of Engineering',
          photoUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
        }),
        this.repository.create({
          name: 'Devi Anggraini',
          position: 'Lead UI/UX Designer',
          photoUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
        }),
        this.repository.create({
          name: 'Andi Wijaya',
          position: 'Senior Backend Engineer',
          photoUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
        }),
        this.repository.create({
          name: 'Maya Putri',
          position: 'Product Manager',
          photoUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
        }),
        this.repository.create({
          name: 'Farhan Ramadhan',
          position: 'DevOps Engineer',
          photoUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
        }),
        this.repository.create({
          name: 'Linda Setiawan',
          position: 'QA Lead',
          photoUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
        }),
      ]);
    }
  }
}
