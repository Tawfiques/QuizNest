import express from "express";
import Quiz from "../models/quiz.model.js";
import { verifyToken } from "../utils/verifyUser.js";
import { errorHandler } from '../utils/error.js';
import User from "../models/user.model.js";
import Question from "../models/question.model.js";

const route = express.Router();

route.get("/all", verifyToken, async (req, res, next) => {
    try {
        const userCreatedQuizzes = await Quiz.find({ creator: req.user.id }, { _id: 1, title: 1, startDate: 1, endDate: 1 });
        return res.status(200).json(userCreatedQuizzes);
    } catch (error) {
        next(error);
    }
})

route.get("/edit/:id", verifyToken, async (req, res, next) => {
    const id = req.params.id;
    let quiz;
    try {
        quiz = await Quiz.findById(id);
        if (!quiz) {
            return next(errorHandler(404, "Quiz not found"));
        }
        if (quiz.creator.toString() !== req.user.id) {
            return next(errorHandler(403, "You are not the creator of this quiz"));
        }
    } catch (error) {
        return next(error);
    }
    try {
        const questions = await Question.find({ _id: { $in: quiz.questions } });
        return res.status(200).json({ quiz, questions });
    } catch (error) {
        return next(error);
    }

})



route.post("/question/add", verifyToken, async (req, res, next) => {
    const { quizId, newQuestion: { text, option1, option2, option3, option4, answer } } = req.body;
    if (!quizId || !text || !option1 || !option2 || !option3 || !option4 || !answer) {
        return next(errorHandler(400, "Please fill in all fields"));
    }
    if (![option1, option2, option3, option4].includes(answer)) {
        return next(errorHandler(400, "Answer must be one of the options"));
    }
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return next(errorHandler(404, "Quiz not found"));
        }
        if (quiz.creator.toString() !== req.user.id) {
            return next(errorHandler(403, "You are not the creator of this quiz"));
        }
        const question = { text, options: [option1, option2, option3, option4], answer, quiz: quizId };
        const CreatedQuestion = await Question.create(question);
        await Quiz.findByIdAndUpdate(quizId, { $push: { questions: CreatedQuestion._id } });
        return res.status(201).json({ message: "Question created successfully", question: CreatedQuestion });
    } catch (error) {
        next(error);
    }
})

route.post("/create", verifyToken, async (req, res, next) => {
    const { title, startDate, endDate } = req.body;
    if (!title) {
        return next(errorHandler(400, "Title is required"));
    }

    if (startDate >= endDate) {
        return next(errorHandler(400, "Start date must be before end date"));
    }
    const today = new Date().toISOString().split('T')[0];
    if (startDate < today) {
        return next(errorHandler(400, "Start date must be after current date"));
    }
    const creator = req.user.id;
    const quiz = new Quiz({ title, creator, startDate, endDate });

    try {
        const newQuiz = await quiz.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { quizzesCreated: newQuiz._id } });
        return res.status(200).json({ message: "Quiz created successfully" });
    } catch (error) {
        next(error);
    }
});

route.delete("/delete/:id", verifyToken, async (req, res, next) => {
    const id = req.params.id;
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return next(errorHandler(404, "Quiz not found"));
        }
        if (quiz.creator.toString() !== req.user.id) {
            return next(errorHandler(403, "You are not the creator of this quiz"));
        }
        await Quiz.deleteOne({ _id: id });
        await User.findByIdAndUpdate(req.user.id, { $pull: { quizzesCreated: id } });
        return res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        next(error);
    }
});


export default route;


