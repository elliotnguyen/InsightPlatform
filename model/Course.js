const mongoose = require("mongoose");
const User = require("./User");

const CourseSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    courseName: String,
    lecturer: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
        validate: {
            validator: async function(value) {
                for (const id of value) {
                    if (!await User.isLecturer(id)) {
                        return false;
                    }
                }
                return true;
            }
        }
    },
    price: {
        type: Number,
        default: 1
    },
    rating: {
        point: {
            type: Number,
            default: 0
        },
        ratedBy: {
            type: Number,
            default: 0
        }
    }    
});

CourseSchema.statics.isExistingCourse = async function(id) {
    const course = await this.findOne({ _id: id });
    return (course !== null);
}

module.exports = mongoose.model("Course", CourseSchema);