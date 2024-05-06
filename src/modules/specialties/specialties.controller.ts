import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { specialtiesDTO } from './dto/specialties.dto';
import { SpecialtiesService as SpecialtiesService } from './specialties.service';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private ReviewService: SpecialtiesService) {}

  @Get()
  getAll() {
    return this.ReviewService.getAll();
  }

  @Post()
  create(@Body() reviews: specialtiesDTO) {
    return this.ReviewService.create(reviews);
  }

  @Patch(':id')
  async updateReview(@Param('id') id: string, @Body() updatedReviewData: Partial<specialtiesDTO>) {
    return this.ReviewService.update(id, updatedReviewData);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.ReviewService.delete(id);
  }
}
