import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
  export default Quiz