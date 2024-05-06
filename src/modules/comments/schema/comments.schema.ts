/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentsDocument = Comments & Document;

@Schema({ timestamps: true })
export class Comments {
  @Prop()
  client_name: string;
  @Prop()
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
