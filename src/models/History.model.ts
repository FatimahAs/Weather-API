import mongoose, { Document, Schema } from 'mongoose';

export interface IHistory extends Document {
  user: mongoose.Types.ObjectId;
  weather: mongoose.Types.ObjectId;
  lat: number;
  lon: number;
  requestedAt: Date;
}

const historySchema = new Schema<IHistory>({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  weather: { type: Schema.Types.ObjectId, ref: 'Weather', required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  requestedAt: { type: Date, default: Date.now, index: true }
});

export default mongoose.model<IHistory>('History', historySchema);
