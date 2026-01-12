import mongoose, { Schema, Document } from 'mongoose';

export interface ILabel extends Document {
  key: string;
  value: string;
}

const LabelSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ILabel>('Label', LabelSchema);
