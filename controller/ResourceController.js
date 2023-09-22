const mongoose = require("mongoose");
const Resource = require("../model/Resource");

const ResourceController = {
    addResource: async (req, res, next) => {
        if (!req.body.community || !req.body.content || !req.body.uploader) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newResource = new Resource({
            _id: new mongoose.Types.ObjectId,
            community: req.body.community,
            content: req.body.content,
            uploadedDate: req.body.uploadedDate,
            uploader: req.body.uploader
        });

        try {
            await newResource.save();
        } catch (err) {
            next({
                success: false,
                message: "Resource upload failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            resource: newResource
        });
    }
}

module.exports = ResourceController;