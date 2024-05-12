/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type ServicesDocument = Services & Document;

@Schema({ timestamps: true })
export class Services {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, default: '662741f6ac5568ad604b8b48' })
  idBranch?: ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Services);
