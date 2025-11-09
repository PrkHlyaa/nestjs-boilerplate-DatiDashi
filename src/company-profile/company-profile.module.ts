import { Module } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { ProductsModule } from '../products/products.module';
import { OrganizationMembersModule } from '../organization-members/organization-members.module';
import { FeaturesModule } from '../features/features.module';
import { PricingsModule } from '../pricings/pricings.module';
import { AboutModule } from '../about/about.module';

@Module({
  imports: [
    ProductsModule,
    OrganizationMembersModule,
    FeaturesModule,
    PricingsModule,
    AboutModule,
  ],
  providers: [CompanyProfileService],
  exports: [CompanyProfileService],
})
export class CompanyProfileModule {}
