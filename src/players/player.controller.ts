import express, { Request, Response, Router } from 'express';
import * as playerService from './player.service';
import { validatePlayerCreate,validatePlayerUpdate } from '../middleware/validateParameters';

const router: Router = express.Router();

// 🎯 Get recent results for a player
router.get('/:playerId/recent', async (req: Request, res: Response) => {
    try {
        const playerId = req.params.playerId;
        const results = await playerService.getRecentResults(playerId);
        res.json(results);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 🏆 Get leaderboard
router.get('/leaderboard', async (req: Request, res: Response) => {
    try {
        const leaderboard = await playerService.getLeaderboard();
        res.json(leaderboard);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// 📝 Add a new player
router.post('/add', validatePlayerCreate, async (req: Request, res: Response) => {
    try {
        const { name, password, mail } = req.body;
        const player = await playerService.addPlayer({ name, password, mail });
        res.status(201).json(player);
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Internal server error' });
    }
});

// ✏️ Edit player details
router.put('/:playerid', validatePlayerUpdate, async (req: Request, res: Response) => {
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
router.delete('/:playerid', async (req: Request, res: Response) => {
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
router.get('/:playerid', async (req: Request, res: Response) => {
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
