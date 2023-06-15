import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BadgesDocument = Badges & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Badges {
  @Prop({ trim: true, required: true })
  image_url: string;

  @Prop({ trim: true })
  type: string;

  @Prop({})
  unit_id: string;

  @Prop({})
  chapter_id: string;

  @Prop({})
  name: string;

  @Prop({})
  description: string;

  @Prop({ type: 'number', default: 0 })
  points: number;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const BadgesSchema = SchemaFactory.createForClass(Badges);
