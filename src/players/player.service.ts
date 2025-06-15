import PlayerModel from './player.model';

export const addPlayer = async (data: Omit<any, '_id' | 'totalGames' | 'wins'>) => {
  const player = new PlayerModel({ ...data, totalGames: 0, wins: 0 });
  return await player.save();
};
export const getPlayerById = async (id: string) => {
  return await PlayerModel.findById(id).populate('games');
};

export const getRecentResults = async (playerId: string) => {
  const player = await PlayerModel.findById(playerId);
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
  return await PlayerModel.findByIdAndUpdate(id, updateData, { new: true });
};
export const deletePlayer = async (id: string) => {
  return await PlayerModel.findByIdAndDelete(id);
};
