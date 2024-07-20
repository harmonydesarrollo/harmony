/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type AppointmentsDocument = Appointments & Document;

@Schema({ timestamps: true })
export class Appointments {
  @Prop()
  fullName: string;     // jorge montiel salguero
  @Prop()
  telephone: string;    // 7711129510
  @Prop({ type: SchemaTypes.ObjectId, default: undefined })
  idService?: ObjectId; // 662b108dd25ce70194ea5974
  @Prop()
  date: Date;         // 1 de julio
  @Prop()
  hour:string;          // 4:30 pm
  @Prop()
  status: string;       // pagado - pendiente de pago - cancelado - reagendado
}

export const AppointmentsSchema = SchemaFactory.createForClass(Appointments);
