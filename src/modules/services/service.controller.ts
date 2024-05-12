import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ServicesDTO } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('services')
export class ServicesController {
  constructor(private serviceService: ServiceService) {}

  @Get()
  getAll() {
    return this.serviceService.getAll();
  }
  @Get(':id')
  getByIdBranch(@Param('id') id: string) {
    console.log({ id });
    return this.serviceService.getByIdBranch(id);
  }

  @Post()
  create(@Body() services: ServicesDTO) {
    return this.serviceService.create(services);
  }

  @Patch(':id')
  async updateReview(@Param('id') id: string, @Body() updatedServiceData: Partial<ServicesDTO>) {
    return this.serviceService.update(id, updatedServiceData);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
