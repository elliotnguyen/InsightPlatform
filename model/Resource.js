const mongoose = require("mongoose");
const Community = require("./Community");
const User = require("./User");

const ResourceSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    community: {
        type: mongoose.Types.ObjectId,
        ref: "Community",
        validate: {
            validator: async function(value) {
                if (!await Community.isExistingCommunity(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    content: {
        type: Buffer,
        required: true
    },
    uploadedDate: {
        type: Date,
        default: Date.now,
    },
    uploader: {
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
    }
});

ResourceSchema.statics.isExistingResource = async function(id) {
    const resource = await this.findOne({ _id: id });
    return (resource !== null);
}

module.exports = mongoose.model("Resource", ResourceSchema);