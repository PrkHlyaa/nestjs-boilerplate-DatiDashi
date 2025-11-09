import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutResponseDto } from './dto/about-response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new about section' })
  @ApiResponse({
    status: 201,
    description: 'About section created successfully',
    type: AboutResponseDto,
  })
  create(@Body() createAboutDto: CreateAboutDto): Promise<AboutResponseDto> {
    return this.aboutService.create(createAboutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all about sections' })
  @ApiResponse({
    status: 200,
    description: 'List of about sections',
    type: [AboutResponseDto],
  })
  findAll(@Query('section') section?: string): Promise<AboutResponseDto[]> {
    if (section) {
      return this.aboutService.findBySection(section);
    }
    return this.aboutService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an about section by ID' })
  @ApiResponse({
    status: 200,
    description: 'About section found',
    type: AboutResponseDto,
  })
  @ApiResponse({ status: 404, description: 'About section not found' })
  findOne(@Param('id') id: string): Promise<AboutResponseDto> {
    return this.aboutService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an about section' })
  @ApiResponse({
    status: 200,
    description: 'About section updated successfully',
    type: AboutResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateAboutDto: UpdateAboutDto,
  ): Promise<AboutResponseDto> {
    return this.aboutService.update(id, updateAboutDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an about section' })
  @ApiResponse({
    status: 200,
    description: 'About section deleted successfully',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.aboutService.remove(id);
  }
}
