import express from 'express';
import * as gameService from './game.service';
import Game from './game.model'
import Player from '../players/player.model';
const router = express.Router();

router.post('/start', async (req, res) => {
  const { name, password } = req.body;
  const player = await Player.findOne({ name, password });
  if (!player) return res.status(401).json({ error: 'Invalid credentials' });

  const game = await gameService.createGame(player._id.toString());
  res.json({ gameId: game._id });
});

router.post('/:gameId/guess', async (req, res) => {
  try {
    const result = await gameService.guessCode(req.params.gameId, req.body.guess);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/:gameId', async (req, res) => {
  const game = await Game.findById(req.params.gameId);
    if (!game) return await res.status(404).json({ error: 'Game not found' });

  res.json(game);
});

router.post('/:gameId/end', async (req, res) => {
  const game = await Game.findById(req.params.gameId);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  game.status = 'ended';
  await game.save();
  res.send('Game ended');
});

export default router;
