import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GiftsDocument = Gifts & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Gifts {
  @Prop({ trim: true, required: true })
  image_url: string;

  @Prop({})
  name: string;

  @Prop({})
  description: string;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const GiftsSchema = SchemaFactory.createForClass(Gifts);
