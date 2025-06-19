// 
import { Request, Response, NextFunction } from 'express';

export const validatePlayerCreate = (req: Request, res: Response, next: NextFunction): void => {
  const { name, password, mail } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Name is required and must be a string' });
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 4) {
    res.status(400).json({ error: 'Password must be at least 4 characters long' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!mail || typeof mail !== 'string' || !emailRegex.test(mail)) {
    res.status(400).json({ error: 'Valid email is required' });
    return;
  }

  next();
};


export const validatePlayerUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { name, password, mail } = req.body;

  if (name !== undefined && typeof name !== 'string') {
    res.status(400).json({ error: 'Name must be a string' });
    return;
  }

  if (password !== undefined && (typeof password !== 'string' || password.length < 4)) {
    res.status(400).json({ error: 'Password must be at least 4 characters long' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mail !== undefined && (typeof mail !== 'string' || !emailRegex.test(mail))) {
    res.status(400).json({ error: 'Valid email is required' });
    return;
  }

  next();
};
