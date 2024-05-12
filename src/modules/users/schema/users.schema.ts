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
  @Prop({ type: SchemaTypes.ObjectId, default: '664035b4b66b5d80f001a154' })
  idBranch?: ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, default: '66403607790832ab3b9ff8ae' })
  idRol?: ObjectId;
  @Prop()
  photo: string;
  @Prop({ default: undefined })
  password?: string;
  @Prop({ default: undefined })
  username?: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
