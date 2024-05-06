/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewsDocument = Reviews & Document;

@Schema({ timestamps: true })
export class Reviews {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Reviews);
