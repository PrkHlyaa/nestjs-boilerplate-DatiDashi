import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './domain/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutResponseDto } from './dto/about-response.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,
  ) {}

  async create(createAboutDto: CreateAboutDto): Promise<AboutResponseDto> {
    const about = this.aboutRepository.create(createAboutDto);
    return await this.aboutRepository.save(about);
  }

  async findAll(): Promise<AboutResponseDto[]> {
    return await this.aboutRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findBySection(section: string): Promise<AboutResponseDto[]> {
    return await this.aboutRepository.find({
      where: { section, isActive: true },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<AboutResponseDto> {
    const about = await this.aboutRepository.findOne({ where: { id } });
    if (!about) {
      throw new NotFoundException(`About with ID ${id} not found`);
    }
    return about;
  }

  async update(
    id: string,
    updateAboutDto: UpdateAboutDto,
  ): Promise<AboutResponseDto> {
    const about = await this.aboutRepository.findOne({ where: { id } });
    if (!about) {
      throw new NotFoundException(`About with ID ${id} not found`);
    }
    Object.assign(about, updateAboutDto);
    return await this.aboutRepository.save(about);
  }

  async remove(id: string): Promise<void> {
    const about = await this.aboutRepository.findOne({ where: { id } });
    if (!about) {
      throw new NotFoundException(`About with ID ${id} not found`);
    }
    await this.aboutRepository.remove(about);
  }
}
