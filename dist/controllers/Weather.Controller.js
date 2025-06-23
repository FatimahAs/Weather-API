"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const Weather_model_1 = __importDefault(require("../models/Weather.model"));
const History_model_1 = __importDefault(require("../models/History.model"));
const FetchWeather_1 = __importDefault(require("../utils/FetchWeather"));
const getWeather = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { lat, lon } = req.query;
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        const roundedLat = parseFloat(latNum.toFixed(2));
        const roundedLon = parseFloat(lonNum.toFixed(2));
        let weather = await Weather_model_1.default.findOne({ lat: roundedLat, lon: roundedLon });
        if (!weather) {
            const data = await (0, FetchWeather_1.default)(latNum, lonNum);
            weather = await Weather_model_1.default.create({ lat: roundedLat, lon: roundedLon, data });
        }
        await History_model_1.default.create({ user: userId, weather: weather._id, lat: latNum, lon: lonNum });
        res.json(weather.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get weather', details: err.message });
    }
};
exports.getWeather = getWeather;
