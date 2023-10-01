const mongoose = require("mongoose");
const User = require("../model/User.js");
const { parseQuery } = require("./utils");

const UserController = {
    // Add a user to database
    addUser: async (req, res, next) => {
        if (!req.body.name || !req.body.password || !req.body.metamaskId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            })
            return;
        }

        const existing = await User.findOne({ name: req.body.name });
        if (existing) {
            res.status(401);
            res.json({
                message: "User name already exists",
                inValid: true,
                success: false
            })
            return;
        }

        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            password: req.body.password,
            createdDate: new Date(),
            //yearOfBirth: new Date(),
            metamaskId: req.body.metamaskId,
            point: req.body.point
        });
        
        try {
            await newUser.save();
        } catch (err) {
            next({
                success: false,
                isDuplicated: true,
                message: "User insertion failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            user: newUser
        });
    },

    // Get details from query
    getDetails: async (req, res, next) => {
        const query = await parseQuery(req.query);

        if (query.name || query.walletAccount) {
            next({
                invalidFields: true,
                message: "Querying user details by email or MetaMask address is prohibited."
            })
            return;
        }

        try {
            const details = await User.find(query).select("name createdDate createdDate metamaskId -_id");
            res.status(200).json({
                success: true,
                accountDetails: details
            })
        } catch (err) {
            next({
                success: false,
                message: "Couldn't find user",
                error: err
            });
            return;
        };
    },

    getUserNameFromId: async (req, res, next) => {
        const query = await parseQuery(req.query);

        if (!query.id) {
            next({
                invalidFields: true,
                message: "Missing ID."
            });
        }

        try {
            const name = await User.findOne({_id: query.id}).select("name");
            res.status(200).json({
                success: true,
                name: name
            });
        } catch (err) {
            next({
                success: false,
                message: "Couldn't find user name",
                error: err
            })
            return;
        }
    }
}

module.exports = UserController;