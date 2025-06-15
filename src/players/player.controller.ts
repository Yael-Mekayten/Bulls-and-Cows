import express, { Request, Response, Router } from 'express';

import * as playerService from './player.service';

const router: Router = express.Router();

// 🎯 Get recent results for a player
router.get('/:playerid/recent', async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.playerid;
        const results = await playerService.getRecentResults(playerId);
        res.json(results);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 🏆 Get leaderboard
router.get('/leaderboard', async (req: Request, res: Response): Promise<void> => {
    try {
        const leaderboard = await playerService.getLeaderboard();
        res.json(leaderboard);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 📝 Add a new player
router.post('/add', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(400).json({ error: 'Name and password are required' });
            return;
        }
        const player = await playerService.addPlayer({ name, password });
        res.status(201).json(player);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// ✏️ Edit player details
router.put('/:playerid', async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.playerid;
        const updateData = req.body;
        const updatedPlayer = await playerService.updatePlayer(playerId, updateData);
        if (!updatedPlayer) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        res.json(updatedPlayer);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 🗑️ Delete a player
router.delete('/:playerid', async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.playerid;
        const deletedPlayer = await playerService.deletePlayer(playerId);
        if (!deletedPlayer) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        res.json({ message: 'Player deleted successfully' });
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 🔍 Get player by ID
router.get('/:playerid', async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.playerid;
        const player = await playerService.getPlayerById(playerId);
        if (!player) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        res.json(player);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

export default router;
