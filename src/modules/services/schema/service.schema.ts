/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServicesDocument = Services & Document;

@Schema({ timestamps: true })
export class Services {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Services);
