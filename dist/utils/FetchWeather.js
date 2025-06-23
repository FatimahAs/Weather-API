"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const FetchWeather = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new Error('Missing OpenWeather API key');
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
};
exports.default = FetchWeather;
