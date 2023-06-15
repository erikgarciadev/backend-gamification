import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Users {
  @Prop({ required: true, unique: true, trim: true, minlength: 6 })
  username: string;

  @Prop({ trim: true })
  firstname: string;

  @Prop({ enum: ['M', 'F'] })
  gender: string;

  @Prop({ required: true, minlength: 6, trim: true })
  password: string;

  @Prop({})
  image_url: string;

  @Prop({ required: true, default: false })
  deleted: boolean;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: 0 })
  coins: number;

  @Prop({})
  role_id: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
