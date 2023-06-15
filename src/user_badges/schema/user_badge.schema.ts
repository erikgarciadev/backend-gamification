import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserBadgesDocument = UserBadges & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class UserBadges {
  @Prop({})
  user_id: string;

  @Prop({})
  badge_id: string;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const UserBadgesSchema = SchemaFactory.createForClass(UserBadges);
