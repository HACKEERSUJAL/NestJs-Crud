import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  password: string;
  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
