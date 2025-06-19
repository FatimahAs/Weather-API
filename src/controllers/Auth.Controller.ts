import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.model';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err: any) {
    res.status(400).json({ error: 'Signup failed', details: err.message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Signin failed' });
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'Signout successful (client must delete token)' });
};
