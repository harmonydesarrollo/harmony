import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { QuestionsDTO } from './dto/questions.dto';


@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionService) {}

  @Get()
  getAll() {
    return this.questionsService.getAll();
  }

  @Post()
  create(@Body() questions: QuestionsDTO) {
    return this.questionsService.create(questions);
  }

  @Patch(':id')
  async updateQuestion(@Param('id') id: string, @Body() updatedQuestionData: Partial<QuestionsDTO>) {
    return this.questionsService.update(id, updatedQuestionData);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionsService.delete(id);
  }
}
