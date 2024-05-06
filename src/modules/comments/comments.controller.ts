import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentsDTO } from './dto/comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentService) {}

  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @Post()
  create(@Body() comments: CommentsDTO) {
    return this.commentService.create(comments);
  }
}
