const mongoose = require("mongoose");
const User = require("./User");

const RequestMentorSchema = new mongoose.Schema ({
    _id: mongoose.Types.ObjectId,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        validate: {
            validator: async function(value) {
                if (!await User.isExistingUser(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    mentor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        validate: {
            validator: async function(value) {
                if (!await User.isExistingUser(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RequestMentor', RequestMentorSchema);
