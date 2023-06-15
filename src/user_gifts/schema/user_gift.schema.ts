import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserGiftsDocument = UserGifts & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class UserGifts {
  @Prop({ trim: true, required: true })
  user_id: string;

  @Prop({ trim: true, required: true })
  gift_id: string;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const UserGiftsSchema = SchemaFactory.createForClass(UserGifts);
