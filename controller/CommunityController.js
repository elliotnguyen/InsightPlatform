const mongoose = require("mongoose");
const Community = require("../model/Community");

const CommunityController = {
    addCommunity: async (req, res, next) => {
        if (!req.body.name) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newCommunity = new Community({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            createdDate: req.body.createdDate,
            description: req.body.description
        });

        try {
            await newCommunity.save();
        } catch (err) {
            next({
                success: false,
                message: "Community creation falied.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            community: newCommunity
        })
    }
}

module.exports = CommunityController;