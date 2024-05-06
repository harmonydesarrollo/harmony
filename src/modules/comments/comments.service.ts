import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from './schema/comments.schema';
import { CommentsDTO } from './dto/comments.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments.name) private commentsModule: Model<CommentsDocument>,
  ) {}

  async getAll() {
    return await this.commentsModule.find().exec();
  }

  async create(comments: CommentsDTO) {
    const created_comment = await this.commentsModule.create(comments);
    return created_comment;
  }
}
