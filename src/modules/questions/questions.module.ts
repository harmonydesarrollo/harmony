import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from './schema/questions.schema';
import { QuestionsController } from './questions.controller';
import { QuestionService } from './questions.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Questions.name,
        schema: QuestionsSchema,
      },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionsModule {}
