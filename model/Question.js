const mongoose = require("mongoose");
const Course = require("./Course");
const { DifficultyEnum } = require("../constants/Enum");

const QuestionSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    courseId: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: async function(value) {
                if (!await Course.isExistingCourse(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    content: {
        question: {
            type: String,
            required: true
        },
        options: [String],
        answer: {
            type: String,
            required: true
        }
    },
    difficulty: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Question", QuestionSchema);