import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  middleName: string;
  @Prop({ default: '' })
  gender?: string;
  @Prop({ default: '' })
  birthday: string; // cambiar el tipo de dato a date
  @Prop()
  fullName: string;
  @Prop({ type: SchemaTypes.ObjectId, default: undefined })
  idSpecialty?: ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, default: '662741f6ac5568ad604b8b48' })
  idBranch?: ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, default: '66274451ac5568ad604b8b4c' })
  idRol?: ObjectId;
  @Prop()
  photo: string;
  @Prop({ default: undefined })
  password?: string;
  @Prop({ default: undefined })
  username?: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
