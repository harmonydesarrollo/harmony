import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewsDTO } from './dto/reviews.dto';
import { ReviewService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private ReviewService: ReviewService) {}

  @Get()
  getAll() {
    return this.ReviewService.getAll();
  }

  @Post()
  create(@Body() reviews: ReviewsDTO) {
    return this.ReviewService.create(reviews);
  }

  @Patch(':id')
  async updateReview(@Param('id') id: string, @Body() updatedReviewData: Partial<ReviewsDTO>) {
    return this.ReviewService.update(id, updatedReviewData);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.ReviewService.delete(id);
  }
}
