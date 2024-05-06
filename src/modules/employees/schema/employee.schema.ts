/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeesDocument = Employees & Document;

@Schema({ timestamps: true })
export class Employees {
  @Prop()
  specialty: string;
  @Prop()
  firstName: string;
  @Prop()
  fullName: string;
  @Prop()
  id_specialty: string;
  @Prop()
  lastName: string;
  @Prop()
  middleName: string;
  @Prop()
  photo: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employees);
