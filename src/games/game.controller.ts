import express, { Request, Response, Router } from 'express';
import * as gameService from './game.service';
import Game from './game.model';
import Player from '../players/player.model';

const router: Router = express.Router();

// 🎮 Start a new game
router.post('/start', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json({ error: 'Name and password are required' });
      return;
    }

    const player = await Player.findOne({ name, password });
    if (!player) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    if (!player._id) {
      res.status(500).json({ error: 'Player ID is missing' });
      return;
    }
    const game = await gameService.createGame(player._id.toString());
    res.status(201).json({ gameId: game._id });
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Internal server error' });
  }
});

// 🔢 Submit a guess
router.post('/:gameId/guess', async (req: Request, res: Response): Promise<void> => {
  try {
    const { guess } = req.body;
    if (!Array.isArray(guess) || guess.length !== 4) {
      res.status(400).json({ error: 'Guess must be an array of 4 numbers' });
      return;
    }

    const result = await gameService.guessCode(req.params.gameId, guess);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message || 'Invalid guess' });
  }
});

// 🔍 Get game status
router.get('/:gameId', async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    res.json(game);
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Internal server error' });
  }
});

// 🛑 End a game early
router.post('/:gameId/end', async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    if (['ended', 'won', 'lost'].includes(game.status)) {
      res.status(400).json({ error: 'Game already finished' });
      return;
    }

    game.status = 'ended';
    await game.save();
    res.send('Game ended');
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Internal server error' });
  }
});

export default router;
