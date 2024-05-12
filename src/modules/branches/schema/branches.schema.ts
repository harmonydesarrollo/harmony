/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BranchesDocument = Branches & Document;

@Schema({ timestamps: true })
export class Branches {
  @Prop()
  name: string;
  @Prop()
  state: string;
  @Prop()
  fullAddress: string;
  @Prop()
  references: string;
  @Prop()
  phone: string;
  @Prop()
  photo: string;
}

export const BranchesSchema = SchemaFactory.createForClass(Branches);
