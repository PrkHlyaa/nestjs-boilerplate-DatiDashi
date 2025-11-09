import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('layouts/pages/admin')
  async getDashboard() {
    const stats = await this.adminService.getDashboardStats();
    return {
      title: 'Admin Dashboard',
      name: 'DatiDashi Company',
      ...stats,
    };
  }

  @Get('users')
  @Render('layouts/pages/admin-users')
  async getUsers() {
    const users = await this.adminService.getAllUsers();
    return {
      title: 'User Management',
      name: 'DatiDashi Company',
      users,
    };
  }

  @Get('products')
  @Render('layouts/pages/admin-products')
  async getProducts() {
    const products = await this.adminService.getAllProducts();
    return {
      title: 'Product Management',
      name: 'DatiDashi Company',
      products,
    };
  }

  @Get('pricings')
  @Render('layouts/pages/admin-pricings')
  async getPricings() {
    const pricings = await this.adminService.getAllPricings();
    return {
      title: 'Pricing Management',
      name: 'DatiDashi Company',
      pricings,
    };
  }

  @Get('features')
  @Render('layouts/pages/admin-features')
  async getFeatures() {
    const features = await this.adminService.getAllFeatures();
    return {
      title: 'Feature Management',
      name: 'DatiDashi Company',
      features,
    };
  }

  @Get('about')
  @Render('layouts/pages/admin-about')
  async getAbout() {
    const about = await this.adminService.getAllAbout();
    return {
      title: 'About Management',
      name: 'DatiDashi Company',
      about,
    };
  }

  @Get('members')
  @Render('layouts/pages/admin-members')
  async getMembers() {
    const members = await this.adminService.getAllMembers();
    return {
      title: 'Team Members Management',
      name: 'DatiDashi Company',
      members,
    };
  }
}
