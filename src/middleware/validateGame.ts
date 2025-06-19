import { Request, Response, NextFunction } from 'express';

export function validateGuess(req: Request, res: Response, next: NextFunction) {
    const { guess } = req.body;

    // Check existence
    if (!guess) {
        return res.status(400).json({ error: 'Guess is required' });
    }

    // Check type and structure
    if (!Array.isArray(guess)) {
        return res.status(400).json({ error: 'Guess must be an array' });
    }

    if (guess.length !== 4) {
        return res.status(400).json({ error: 'Guess must be exactly 4 digits long' });
    }

    // Check all numbers and uniqueness
    const seen = new Set<number>();
    for (const digit of guess) {
        if (typeof digit !== 'number' || digit < 1 || digit > 9) {
            return res.status(400).json({ error: 'Each digit must be a number from 1 to 9' });
        }
        if (seen.has(digit)) {
            return res.status(400).json({ error: 'Guess must not contain duplicate digits' });
        }
        seen.add(digit);
    }

    next();
}
