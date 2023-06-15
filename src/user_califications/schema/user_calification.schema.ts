import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCalificationsDocument = UserCalifications & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class UserCalifications {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  unit_id: string;

  @Prop({ required: true })
  chapter_id: string;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const UserCalificationsSchema =
  SchemaFactory.createForClass(UserCalifications);
