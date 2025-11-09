import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { PricingsModule } from '../pricings/pricings.module';
import { FeaturesModule } from '../features/features.module';
import { AboutModule } from '../about/about.module';
import { OrganizationMembersModule } from '../organization-members/organization-members.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    PricingsModule,
    FeaturesModule,
    AboutModule,
    OrganizationMembersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
