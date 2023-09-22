const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String
    },
    entranceTestConfig: {
        type: Buffer
    }
});

CommunitySchema.statics.isExistingCommunity = async function(id) {
    const community = await this.findOne({ _id: id });
    return (community !== null);
}

module.exports = mongoose.model("Community", CommunitySchema);