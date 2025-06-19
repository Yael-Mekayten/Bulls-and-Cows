import Game from './game.model';
import { BullPgia } from './game.logic';//מחלקה עם 2 פונקציות:אתחול מערך של ניחושים ובדיקה כמה בולים וכמה פגיעות וחזרה שלהם.


export const startGame = async (playerId: string) => {
  const secretCode = BullPgia.generateSecretCode();
  const newGame = new Game({ playerId, secretCode });
  return await newGame.save();
};


export const findGameById = async (gameId: string) => {
  const game = await Game.findById(gameId).populate('playerId');
  if (!game) throw new Error('Game not found'); 
  return game;
}


export const guessCode = async (gameId: string, guess: number[]) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');

  const { bulls, pgias } = BullPgia.evaluateGuess(game.secretCode, guess);
  game.attempts.push({ guess, bulls, pgias });

  if (bulls === 4) {
    game.status = 'won';
    game.winner = true;
  } else if (game.attempts.length >= game.maxAttempts) {
    game.status = 'lost';
    game.winner = false;
  }

  await game.save();
  return {
    bulls,
    pgias,
    remainingAttempts: game.maxAttempts - game.attempts.length,
    status: game.status
  };
};


export const endGame = async (gameId: string) =>  {
  const game = await Game.findById(gameId);

  if (!game || game.status === 'ended') {
    return null;
  }
game.status = 'ended';

  await game.save();

  return game;
};


// services/gameService.ts

