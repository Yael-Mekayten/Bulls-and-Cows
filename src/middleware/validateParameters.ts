import { Request, Response, NextFunction } from 'express';

export function validatePlayer(req: Request, res: Response, next: NextFunction) {
    const { name, password, mail } = req.body;

    // Basic required fields
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
        return res.status(400).json({ error: 'Password is required and must be at least 4 characters' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mail || typeof mail !== 'string' || !emailRegex.test(mail)) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    next();
}
