const mongoose = require("mongoose");
const User = require("../model/User");
const RequestMentor = require("../model/RequestMentor");
const path = require('path');
const { query } = require("express");
const { parseQuery } = require("./utils");

const RequestMentorController = {
    searchMentor: async (req, res) => {
        try {
            const mentors = await User.find({ point: { $gt: 50 } }); 
            res.json(mentors);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    requestMentor: async (req, res, next) => {
        if (!req.body.mentorId && !req.body.userId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        if (req.body.mentorId < 50 || req.body.mentorId < req.body.userId) {
            next({
                success: false,
                message: "Your request mentor is invalid",
                error: err
            });
            return;
        }

        //Check if the pair (user, mentor) already exists in the database and the status is WAITING -> return
        try {
            const existingPair = await RequestMentor.findOne({ user: req.body.userId, mentor: req.body.mentorId });
            if (existingPair != null && existingPair.status === 'WAITING') {
                next({
                    success: false,
                    message: "Already in the waiting list",
                });
                return;
            }
        } catch (error) {
            console.error('Error checking pair:', error);
            return false;
        }

        const newRequest = new RequestMentor({
            _id: new mongoose.Types.ObjectId,
            user: req.body.userId,
            mentor: req.body.mentorId,
            status: 'WAITING'
        });

        try {
            await newRequest.save();
        } catch (error) {
            next({
                success: false,
                message: "Request mentor failed.",
                error: err
            });
            return;
        }

        res.send({
            success: true,
            message: "successfully",
            info: newRequest
        });
    },

    acceptMentor: async (req, res, next) => {
        if (!req.body.mentorId && !req.body.userId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        try {
            const updatedRequest = await RequestMentor.findOneAndUpdate(
                { user: req.body.userId, mentor: req.body.mentorId },
                { $set: { status: "APPROVED" } },
                { new: true } // To return the updated document
            );

            res.send({
                success: true,
                message: "successfully",
                info: updatedRequest
            });
        } catch (error) {
            next({
                success: false,
                message: "Accept Request Failed.",
                error: err
            });
            return;
        }
    }
}

module.exports = RequestMentorController;