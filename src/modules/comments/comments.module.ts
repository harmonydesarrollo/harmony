import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comments } from './schema/comments.schema';
import { CommentService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentsModule {}
