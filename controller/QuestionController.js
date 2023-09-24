const mongoose = require("mongoose");
const Question = require("../model/Question");
const DifficultyEnum = require("../constants/Enum");
const { parseQuery } = require("./utils");

const QuestionController = {
    getQuestionsByDifficulty: async (req, res, next) => {
        const query = await parseQuery(req.query);

        if (!query.courseId || !query.difficulty) {
            next({
                invalidFields: true,
                message: "Missing difficulty."
            });
            return;
        }

        try {
            const questions = await Question.find({
                courseId: query.courseId,
                difficulty: query.difficulty
            }).select("courseId content.question content.options difficulty");
            res.status(200).json({
                success: true,
                questions: questions
            });
        } catch (err) {
            next({
                success: false,
                message: `No questions available at difficulty ${req.body.difficulty}`
            });
            return;
        }
    },

    addQuestion: async (req, res, next) => {
        if (
            !req.body.question ||
            !req.body.options ||
            !req.body.answer ||
            !req.body.difficulty
        ) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newQuestion = new Question({
            _id: new mongoose.Types.ObjectId,
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer,
            createdFrom: req.body.createdFrom,
            difficulty: req.body.difficulty
        });

        try {
            await newQuestion.save();
        } catch (err) {
            next({
                success: false,
                message: "Question insertion failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            course: newQuestion
        });
    },

    addQuestionList: async(req, res, next) => {
        if (!req.body.list) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const failed = [];
        for (const q of req.body.list) {
            const newQuestion = new Question({
                _id: new mongoose.Types.ObjectId,
                question: q.question,
                options: q.options,
                answer: q.answer,
                createdFrom: q.createdFrom,
                difficulty: q.difficulty
            });

            try {
                await newQuestion.save();
            } catch (err) {
                failed.push(newQuestion);
            }
        }

        if (failed.length > 0) {
            res.send({
                success: false,
                failOn: failed
            });
        } else {
            res.send({
                success: true,
                message: "successfully"
            });
        }
    },

    verifyAnswer: async (req, res, next) => {
        if (!req.body.answer || !req.body.id) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        try {
            const correctAnswer = await Question.findOne({_id: req.body.id}).select("answer -_id");
            res.send({
                success: true,
                verification: correctAnswer.answer === req.body.answer
            });
        } catch (err) {
            next({
                success: false,
                message: "Query error."
            })
            return;
        }
    }
}

module.exports = QuestionController;