/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type VideosDocument = Videos & Document;

@Schema({ timestamps: true })
export class Videos {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  urlVideo: string;

  @Prop({ type: SchemaTypes.ObjectId, default: undefined }) // dejar por default el admin
  fkBranchId: ObjectId;

  @Prop({ default: '' }) // dejar por default el admin
  other: string;
}

export const VideosSchema = SchemaFactory.createForClass(Videos);
