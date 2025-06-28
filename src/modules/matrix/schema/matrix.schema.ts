/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type MatrixsDocument = Matrixs & Document;

@Schema({ timestamps: true })
export class Matrixs {
  @Prop()
  img?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, default: '662741f6ac5568ad604b8b48' })
  idBranch?: ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, default: undefined }) 
  fkBranchId: ObjectId;
}

export const MatrixSchema = SchemaFactory.createForClass(Matrixs);
