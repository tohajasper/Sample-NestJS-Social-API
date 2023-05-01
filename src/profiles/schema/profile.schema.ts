import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  name?: string;

  @Prop({ type: String, enum: ['Male' , 'Female' ]})
  gender?: 'Male' | 'Female';

  @Prop()
  birthday?: Date;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true})
  user!: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
