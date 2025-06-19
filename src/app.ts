import express from 'express';
import dotenv from 'dotenv';
import gameRouter from './games/game.controller';
import  connectToDB  from './db/connection';
import playerRouter from './players/player.controller';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/games', gameRouter);
app.use('/api/players', playerRouter);
connectToDB();
export default app;





