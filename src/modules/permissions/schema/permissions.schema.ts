/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type PermissionsDocument = Permissions & Document;

@Schema({ timestamps: true })
export class Permissions {
  @Prop()
  type: string;

  @Prop({ type: SchemaTypes.ObjectId, default: undefined }) // dejar por default el admin
  idPermission: ObjectId;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
