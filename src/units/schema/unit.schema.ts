import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UnitsDocument = Units & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Units {
  @Prop({ trim: true, default: null })
  image_url: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const UnitsSchema = SchemaFactory.createForClass(Units);
