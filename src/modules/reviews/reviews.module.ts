import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema, Reviews } from './schema/reviews.schema';
import { ReviewsController } from './reviews.controller';
import { ReviewService } from './reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reviews.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewsModule {}
