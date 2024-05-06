import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reviews, ReviewsDocument } from './schema/reviews.schema';
import { ReviewsDTO } from './dto/reviews.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Reviews.name)
    private reviewModule: Model<ReviewsDocument>
  ) {}

  async getAll() {
    return await this.reviewModule.find().exec();
  }

  async create(reviews: ReviewsDTO) {
    try {
      const created_review = await this.reviewModule.create(reviews);

      return [
        {
          status: 200,
          message: 'success',
          items: created_review,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: error.message,
          items: [],
        },
      ];
    }
  }
  async update(id: string, updatedReviewData: Partial<ReviewsDTO>) {
    try {
      const updatedReview = await this.reviewModule.findByIdAndUpdate(id, updatedReviewData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedReview,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: error.message,
          items: [],
        },
      ];
    }
  }
  async delete(id: string) {
    try {
      let response = [];
      let status, message;
      const deletedReview = await this.reviewModule.findByIdAndDelete(id);

      if (!deletedReview) {
        status = 404;
        message = 'Review with ID ${id} not found';
      } else {
        status = 200;
        message = 'success';
      }
      return [
        {
          status,
          message,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: 'Error: ' + error.message,
        },
      ];
    }
  }
}
