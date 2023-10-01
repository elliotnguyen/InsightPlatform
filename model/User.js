const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    yearOfBirth: {
        type: Date,
        default: Date.now
    },
    metamaskId: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        default: 0
    }
});

UserSchema.statics.isExistingUser = async function(id) {
    const user = await this.findOne({ _id: id });
    return user !== null;
}

module.exports = mongoose.model("User", UserSchema);