import express, { Request, Response } from 'express';
import * as gameService from './game.service';
import { validateGuess } from '../middleware/validateGame';

const router = express.Router();

// 🎲 Start a new game
router.post('/start', async (req: Request, res: Response): Promise<void> => {
  try {
    const { playerId } = req.body;
    if (!playerId || typeof playerId !== 'string') {
      res.status(400).json({ error: 'playerId is required and must be a string' });
      return;
    }

    const newGame = await gameService.startGame(playerId);
    res.status(201).json(newGame);
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Failed to start game' });
  }
});

// 🎯 Submit a guess
router.post('/:gameId/guess', validateGuess, async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    const { guess } = req.body;

    const result = await gameService.guessCode(gameId, guess);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Failed to process guess' });
  }
});

export default router;
