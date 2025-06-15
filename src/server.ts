import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('היי יעל! השרת שלך עובד 🎉');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
