const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { UserRoleEnum, UserStatusEnum } = require("../constants/Enum");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    walletAccount: {
        type: String,
        unique: true,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    role: {
        type: [Number],
        enum: Object.values(UserRoleEnum),
        default: [UserRoleEnum.member],
    },
    status: {
        type: Number,
        enum: Object.values(UserStatusEnum),
        default: UserStatusEnum.tempSuspended
    }
});

UserSchema.statics.isLecturer = async function(id) {
    const user = await this.findOne({_id: id, role: UserRoleEnum.lecturer});
    return user !== null;
}

module.exports = mongoose.model("User", UserSchema);