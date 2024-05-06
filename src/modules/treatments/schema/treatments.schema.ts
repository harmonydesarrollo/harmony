/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreatmentsDocument = Treatments & Document;

@Schema({ timestamps: true })
export class Treatments {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatments);
