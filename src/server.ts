import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db/connection';
import app from './app';
dotenv.config();
app.get('/', (req, res) => {
  res.send('היי יעל! השרת שלך עובד 🎉');
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


connectToDB();
//Runs the server