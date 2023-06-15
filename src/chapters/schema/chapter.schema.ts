import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ChaptersDocument = Chapters & mongoose.Document;

export class ChapterResource {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  name?: string;
}

// const ChapterResourceSchema = SchemaFactory.createForClass(ChapterResource);

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Chapters {
  @Prop({ trim: true, default: null })
  image_url: string;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ default: '' })
  information: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, default: false })
  deleted: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed }] })
  resources: ChapterResource[];

  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed }] })
  questions: Record<string, any>[];

  @Prop({})
  unit_id: string;
}

export const ChaptersSchema = SchemaFactory.createForClass(Chapters);
