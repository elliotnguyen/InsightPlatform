const mongoose = require("mongoose");
const User = require("../model/User");
const RequestMentor = require("../model/RequestMentor");
const path = require('path');
const { query } = require("express");
const { parseQuery } = require("./utils");

const RequestMentorController = {
    searchMentor: async (req, res, next) => {
        if (!req.body.userId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const mentorStatusList = [];

        try {
            const mentors = await User.find({ point: { $gt: 50 } });
            
            try {
                for (const mentor of mentors) {
                    var status = 'Request'
                    const existingPair = await RequestMentor.findOne({
                        user: req.body.userId,
                        mentor: mentor._id 
                    });
              
                    if (existingPair !== null && existingPair.status === 'WAITING') {
                        status = 'Pending'
                    }
                    
                    mentorStatusList.push({ mentor, status });
                }
            } catch (error) {
                console.error('Error checking pair:', error);
                return false;
            }
            
            res.status(200).json(mentorStatusList);
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

        try {
            const mentor = await User.findById(req.body.mentorId);
            const user = await User.findById(req.body.userId);

            if (!mentor || !user) {
                return res.status(404).json({
                    success: false,
                    message: "Mentor or user not found."
                });
            }
            
            if (mentor.point <= 50 || user.point >= mentor.point) {
                return res.status(400).json({
                    success: false,
                    message: "Your request for mentor is invalid."
                });
            }
            
            const newRequest = new RequestMentor({
                _id: new mongoose.Types.ObjectId(),
                user: user._id,
                mentor: mentor._id,
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
        } catch (error) {
            next({
                success: false,
                message:"Internal server error"
            });
            return;
        }
    },

    searchRequest: async (req, res, next) => {
        if (!req.body.userId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const requestingUsers = [];

        try {
            const users = await RequestMentor.find({mentor: req.body.userId});
            
            for (const user of users) {
                if (user.status === "WAITING") {
                    const u = await User.findById(user.user);
                    requestingUsers.push(u);
                }
            }

            res.status(200).send(requestingUsers);
        } catch (error) {
            next({
                success: false,
                message: "Internal Server Error",
                error: err
            });
            return;
        }
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

            if (!updatedRequest) {
                return next({
                    success: false,
                    message: "Request not found.",
                });
            }

            res.send({
                success: true,
                message: "successfully",
                info: updatedRequest
            });
        } catch (error) {
            next({
                success: false,
                message: "Accept Request Failed.",
                error: error
            });
            return;
        }
    },

    denyRequest: async function(req, res, next) {
        if (!req.body.mentorId && !req.body.userId) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        try {
            const deletedRequest = await RequestMentor.findOneAndRemove({
                user: req.body.userId,
                mentor: req.body.mentorId
            });
    
            if (!deletedRequest) {
                return next({
                    success: false,
                    message: "Request not found.",
                });
            }
    
            res.status(200).json({
                success: true,
                message: "Request successfully denied.",
                info: deletedRequest
            });
        } catch (error) {
            next({
                success: false,
                message: "Accept Request Failed.",
                error: error
            });
            return;
        }
    }
}

module.exports = RequestMentorController;