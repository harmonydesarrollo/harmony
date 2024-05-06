import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartnersDTO } from './dto/partners.dto';
import { PartnerService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private partnersService: PartnerService) {}

  @Get()
  getAll() {
    return this.partnersService.getAll();
  }

  @Post()
  create(@Body() partners: PartnersDTO) {
    return this.partnersService.create(partners);
  }

  @Patch(':id')
  async updatePartner(@Param('id') id: string, @Body() updatedPartnerData: Partial<PartnersDTO>) {
    return this.partnersService.update(id, updatedPartnerData);
  }

  @Delete(':id')
  async deletePartner(@Param('id') id: string) {
    return this.partnersService.delete(id);
  }
}
