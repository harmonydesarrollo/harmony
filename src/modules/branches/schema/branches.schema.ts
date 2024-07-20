/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BranchesDocument = Branches & Document;

@Schema({ timestamps: true })
export class Branches {
  @Prop()
  name: string;
  @Prop()
  number: string;
  @Prop()
  city:string;
  @Prop()
  municipality:string;
  @Prop()
  state:string;
  @Prop()
  phone: string;
}

export const BranchesSchema = SchemaFactory.createForClass(Branches);
