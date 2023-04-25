import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/profiles/schema/profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  username?: string;

  @Prop({ unique: true })
  email?: string;

  @Prop({ required: true, unique: true })
  password!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
