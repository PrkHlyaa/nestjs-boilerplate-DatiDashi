import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { PricingsService } from '../pricings/pricings.service';
import { FeaturesService } from '../features/features.service';
import { AboutService } from '../about/about.service';
import { OrganizationMembersService } from '../organization-members/organization-members.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly pricingsService: PricingsService,
    private readonly featuresService: FeaturesService,
    private readonly aboutService: AboutService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  async getDashboardStats() {
    const [products, pricings, features, about, members] = await Promise.all([
      this.productsService.findAll(),
      this.pricingsService.findAll(),
      this.featuresService.findAll(),
      this.aboutService.findAll(),
      this.organizationMembersService.findAll(),
    ]);

    return {
      totalProducts: products.length,
      totalPricings: pricings.length,
      totalFeatures: features.length,
      totalAbout: about.length,
      totalMembers: members.length,
    };
  }

  getAllUsers() {
    // Get all users from database
    // For now, return empty array
    return [];
  }

  async getAllProducts() {
    return await this.productsService.findAll();
  }

  async getAllPricings() {
    return await this.pricingsService.findAll();
  }

  async getAllFeatures() {
    return await this.featuresService.findAll();
  }

  async getAllAbout() {
    return await this.aboutService.findAll();
  }

  async getAllMembers() {
    return await this.organizationMembersService.findAll();
  }
}
