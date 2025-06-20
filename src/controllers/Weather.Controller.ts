import { Request, Response } from 'express';
import Weather from '../models/Weather.model';
import History from '../models/History.model';
import FetchWeather from '../utils/FetchWeather';

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { lat, lon } = req.query;
console.log('h1')
    const latNum = parseFloat(lat as string);
    const lonNum = parseFloat(lon as string);
console.log('h2')
    const roundedLat = parseFloat(latNum.toFixed(2));
    const roundedLon = parseFloat(lonNum.toFixed(2));
console.log('h3')
    let weather = await Weather.findOne({ lat: roundedLat, lon: roundedLon });

    if (!weather) {
      const data = await FetchWeather(latNum, lonNum);
      weather = await Weather.create({ lat: roundedLat, lon: roundedLon, data });
    }
console.log('h4')
    await History.create({ user: userId, weather: weather._id, lat: latNum, lon: lonNum });
console.log('h5')
    res.json(weather.data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to get weather', details: err.message });
  }
	console.log('h6')
};