/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialtiesDocument = Specialties & Document;

@Schema({ timestamps: true })
export class Specialties {
  @Prop()
  name: string;
}

export const SpecialtiesSchema = SchemaFactory.createForClass(Specialties);
