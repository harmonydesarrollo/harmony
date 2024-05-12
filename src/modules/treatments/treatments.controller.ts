import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TreatmentsDTO } from './dto/treatments.dto';
import { TreatmentService } from './treatments.service';

@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentService) {}

  @Get()
  getAll() {
    return this.treatmentsService.getAll();
  }
  @Get(':id')
  getByIdBranch(@Param('id') id: string) {
    console.log({ id });
    return this.treatmentsService.getByIdBranch(id);
  }

  @Post()
  create(@Body() treatments: TreatmentsDTO) {
    return this.treatmentsService.create(treatments);
  }

  @Patch(':id')
  async updateTreatment(@Param('id') id: string, @Body() updatedTreatmentData: Partial<TreatmentsDTO>) {
    return this.treatmentsService.update(id, updatedTreatmentData);
  }

  @Delete(':id')
  async deleteTreatment(@Param('id') id: string) {
    return this.treatmentsService.delete(id);
  }
}
