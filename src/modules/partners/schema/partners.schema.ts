/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartnersDocument = Partners & Document;

@Schema({ timestamps: true })
export class Partners {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partners);
