import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema({
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  versionKey: false,
})
export class Roles {
  @Prop({ required: true, unique: true, trim: true })
  value: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
