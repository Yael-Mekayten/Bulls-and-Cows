import mongoose from 'mongoose';
//עבור כל ניחוש
const attemptSchema = new mongoose.Schema({
  guess: [Number],
  bulls: Number,
  pgias: Number,
  createdAt: { type: Date, default: Date.now }
});
// הגדרת סכימה למשחק
const gameSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  secretCode: [Number],
  attempts: [attemptSchema],
  status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], default: 'in-progress' },
  maxAttempts: { type: Number, default: 10 },
  winner: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Game', gameSchema);
