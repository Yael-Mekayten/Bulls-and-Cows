import mongoose from "mongoose";
// הגדרת סכימה לשחקן
const playerSchema = new mongoose.Schema({ 

  _id: mongoose.Schema.Types.ObjectId, 

  name: String, 

  password: String, 

  mail: String, 

  totalGames: Number, 

  wins: Number 

} );
export default mongoose.model("Player", playerSchema);