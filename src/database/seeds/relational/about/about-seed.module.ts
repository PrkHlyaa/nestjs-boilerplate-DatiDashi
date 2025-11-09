import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSeedService } from './about-seed.service';
import { About } from '../../../../about/domain/about.entity';

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  providers: [AboutSeedService],
  exports: [AboutSeedService],
})
export class AboutSeedModule {}
