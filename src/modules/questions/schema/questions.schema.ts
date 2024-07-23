import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionsDocument = Questions & Document;

@Schema({ timestamps: true })
export class Questions {
  @Prop()
  question: string;

  @Prop({ default: '' }) // dejar por default el admin
  answer: string;

}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
