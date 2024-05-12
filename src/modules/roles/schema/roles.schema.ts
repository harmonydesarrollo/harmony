/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema({ timestamps: true })
export class Roles {
  @Prop()
  type: string;

  @Prop({ type: SchemaTypes.ObjectId, default: undefined }) // dejar por default el admin
  idPermission: ObjectId;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
