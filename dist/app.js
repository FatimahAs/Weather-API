"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const helpers_1 = require("./utils/helpers");
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const http_status_1 = require("./utils/http-status");
const Mongoose_1 = require("./db/Mongoose");
const Weather_Controller_1 = require("./controllers/Weather.Controller");
const History_Controller_1 = require("./controllers/History.Controller");
const auth_1 = require("./middleware/auth");
// Load environment variables
dotenv_1.default.config();
// Delete all collections
//deleteAllCollections();
// Connect to MongoDB
(0, Mongoose_1.connectDB)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny', {
    stream: {
        write: (message) => logger_1.default.info(message.trim())
    }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/auth', Auth_routes_1.default);
app.get('/weather', auth_1.authenticate, Weather_Controller_1.getWeather);
app.get('/history', auth_1.authenticate, History_Controller_1.getUserHistory);
// Basic route
app.get('/', (req, res) => {
    res
        .status(http_status_1.OK)
        .json({ message: 'Weather API - Welcome!' });
});
// Basic error handling middleware
app.use((err, req, res, next) => {
    logger_1.default.error('Error:', err.message);
    res
        .status(http_status_1.INTERNAL_SERVER_ERROR)
        .json({
        success: false,
        message: 'Something went wrong!',
        error: helpers_1.dev ? err.message : undefined
    });
});
// Start server
app.listen(helpers_1.port, () => {
    logger_1.default.info(`Server is running on port ${helpers_1.port}`);
});
