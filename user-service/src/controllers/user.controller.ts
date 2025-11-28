import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch(error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    res.status(200).json({
      message: 'Login successful', 
      token,
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({ status: 'User service is healthy' });
}

export const validateJWT = async (req: Request, res: Response) => {
  const { userId } = req.params;           // better name than user_id
  const user = await User.findById(userId);

  if (!user) {
    return res.json({ valid: false });     // 200 + false is standard in microservices
  }

  res.json({ valid: true });
};
