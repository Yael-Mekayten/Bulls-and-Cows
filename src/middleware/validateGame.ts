import { Request, Response, NextFunction } from 'express';

export function validateGuess(req: Request, res: Response, next: NextFunction): void {
  const { guess } = req.body;

  if (!Array.isArray(guess)) {
    res.status(400).json({ error: 'Guess must be an array of numbers' });
    return;
  }

  if (guess.length !== 4) {
    res.status(400).json({ error: 'Guess must contain exactly 4 digits' });
    return;
  }

  const allNumbers = guess.every((num: any) => typeof num === 'number' && num >= 1 && num <= 9);
  if (!allNumbers) {
    res.status(400).json({ error: 'Guess must contain only digits from 1 to 9' });
    return;
  }

  const uniqueDigits = new Set(guess);
  if (uniqueDigits.size !== 4) {
    res.status(400).json({ error: 'Guess must not contain repeated digits' });
    return;
  }

  next();
}
