import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true, min: 0 }, // Index of the correct option
  });
  
  const Question = mongoose.model('Question', questionSchema);
  export default Question