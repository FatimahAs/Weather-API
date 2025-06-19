import mongoose, { Document, Schema } from 'mongoose';

export interface IWeather extends Document {
  lat: number;
  lon: number;
  data: any;
  fetchedAt: Date;
}

const weatherSchema = new Schema<IWeather>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  data: Schema.Types.Mixed,
  fetchedAt: { type: Date, default: Date.now, index: { expires: '30m' } }
});

export default mongoose.model<IWeather>('Weather', weatherSchema);