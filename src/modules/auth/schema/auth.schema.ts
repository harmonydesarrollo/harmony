import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre<AuthDocument>('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
