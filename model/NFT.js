const mongoose = require("mongoose");

const NFTSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uri: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String
    },
    externalUrl: {
        type: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    }
});

module.exports = mongoose.model("NFT", NFTSchema);