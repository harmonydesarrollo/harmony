import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, QuestionsDocument } from './schema/questions.schema';
import { QuestionsDTO } from './dto/questions.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Questions.name)
    private questionModule: Model<QuestionsDocument>
  ) {}

  async getAll() {
    // console.log('consulta!!!');
    return await this.questionModule.find().exec();
  }

  async create(questions: QuestionsDTO) {
    try {
      const created_question = await this.questionModule.create(questions);

      return [
        {
          status: 200,
          message: 'success',
          items: created_question,
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
  async update(id: string, updatedQuestionData: Partial<QuestionsDTO>) {
    try {
      const updatedQuestion = await this.questionModule.findByIdAndUpdate(id, updatedQuestionData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedQuestion,
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
      let status, message;
      const deletedQuestion = await this.questionModule.findByIdAndDelete(id);

      if (!deletedQuestion) {
        status = 404;
        message = 'Partner with ID ${id} not found';
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
