import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizzesCreated: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
    }],
    quizzesTaken: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Result'
    }],
});

const User = mongoose.model("User", userSchema);
export default User
