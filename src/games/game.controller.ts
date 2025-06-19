import express, { Request, Response } from 'express';
import * as gameService from './game.service';
import { validateGuess } from '../middleware/validateGame';
import { validatePlayerStartGame } from '../middleware/validateParameters';
import * as playerService from "../players/player.service";
const router = express.Router();
router.get("/:gameId", async (req: Request, res: Response): Promise<void> => {const { gameId } = req.params;

  try {
    const game = await gameService.findGameById(gameId);

    if (!game) {
     res.status(404).json({ error: "Game not found" });return;
    }

    res.json({
      status: game.status,
      guesses: game.attempts || [],
      ...(game.status === "ended" || game.status === "won" ? { secretCode: game.secretCode } : {})
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game status" });
  };
});

router.post('/start', validatePlayerStartGame, async (req: Request, res: Response): Promise<void> =>  {
  const { name, password } = req.body;

  try {
    let player = await playerService.findPlayerByNameAndPassword(name, password);

    if (!player) {
      player = await playerService.createPlayer(name, password);
    }

    const game = await gameService.startGame(player._id.toString());

    res.status(201).json({
      message: 'Game started successfully',
      gameId: game._id,
      playerId: player._id
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to start game', details: err });
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
