/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type PartnersDocument = Partners & Document;

@Schema({ timestamps: true })
export class Partners {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, default: undefined }) // dejar por default el admin
  fkBranchId: ObjectId;
}

export const PartnerSchema = SchemaFactory.createForClass(Partners);
