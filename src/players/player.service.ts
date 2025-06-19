import Player from './player.model';
import mongoose from "mongoose";

export const addPlayer = async (data: Omit<any, '_id' | 'totalGames' | 'wins'>) => {
  const player = new Player({ ...data, totalGames: 0, wins: 0 });
  return await player.save();
};
export const getPlayerById = async (id: string) => {
  return await Player.findById(id).populate('games');
};

export const getRecentResults = async (playerId: string) => {
  const player = await Player.findById(playerId);
  if (!player) throw new Error('Player not found');
  
  const GameModel = require('../games/game.model').default;
  return await GameModel.find({ playerId }).sort({ createdAt: -1 }).limit(10);
};

export const getLeaderboard = async () => {
  const GameModel = require('../games/game.model').default;
  const games = await GameModel.find({ status: 'won' }).sort({ attempts: 1 }).limit(10).populate('playerId');
  return games.map((game: any) => ({
    player: game.playerId.name,
    attempts: game.attempts.length,
    date: game.createdAt,
  }));
};

export const updatePlayer = async (id: string, updateData: Partial<any>) => {
  return await Player.findByIdAndUpdate(id, updateData, { new: true });
};
export const deletePlayer = async (id: string) => {
  return await Player.findByIdAndDelete(id);
};



export const getPlayerByName = async (name: string) => {
  return await Player.findOne({ name }).exec();
};


export async function findPlayerByNameAndPassword(name: string, password: string) {
  return await Player.findOne({ name, password });
}

export async function createPlayer(name: string, password: string) {
  const newPlayer = new Player({
    name,
    password,
    mail: "", // או שדה שאת תבחרי למלא
    totalGames: 0,
    wins: 0
  });

  return await newPlayer.save();
}

