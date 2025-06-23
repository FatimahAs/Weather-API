"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const signUp = async (req, res) => {
    try {
        const { email, password, role = 'user' } = req.body;
        const existing = await User_model_1.default.findOne({ email });
        if (existing) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = await User_model_1.default.create({ email, passwordHash, role });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(201).json({
            message: 'User created',
            userId: user._id,
            token,
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to sign up', details: err.message });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_model_1.default.findOne({ email });
        if (!user || !(await bcrypt_1.default.compare(password, user.passwordHash))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Signin failed' });
    }
};
exports.signIn = signIn;
const signOut = async (req, res) => {
    res.json({ message: 'Signout successful' });
};
exports.signOut = signOut;
