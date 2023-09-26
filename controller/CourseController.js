const mongoose = require("mongoose");
const Course = require("../model/Course");
const ContractController = require("./ContractController");
const path = require('path');
const { query } = require("express");
const { parseQuery } = require("./utils");



const USER_ADDRESS_FAKER = "0x301d50321d084e9457ec42E6723694EdA6A6eC55"
const CourseController = {
    addCourse: async (req, res, next) => {
        if (!req.body.courseName  || !req.body.price) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newCourse = new Course({
            _id: new mongoose.Types.ObjectId,
            courseName: req.body.courseName,
            content: req.file.buffer,
            uploader: "6506c1368982429b06b53346",//get userID from middleware
            description: req.body.description,
            price: req.body.price
        });

        try {
            await newCourse.save();
        } catch (err) {
            next({
                success: false,
                message: "Course insertion failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            course: newCourse
        });

        //for read file

        
        // res.set('Content-Type', 'application/pdf');
        // res.send(newCourse.content);  
    },

    getDetails: async (req, res, next) => {
        console.log(req.params.courseID)
        if(!ContractController.ownsNFTForCourse(USER_ADDRESS_FAKER,req.params.courseID)) {
            next({err:'not own this course'})
            return;
        }
        try {
            const courseDetails = await Course.findOne({ _id: req.params.courseID })
            .populate('uploader', '_id name metamaskId');
            if (!courseDetails) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }
    
            res.status(200).json({
                success: true,
                courseDetails: courseDetails
            });
        } catch (err) {
            next({
                success: false,
                message: "Couldn't fetch course details",
                error: err
            });
        }
    },
    async download(req, res, next){
        if(!ContractController.ownsNFTForCourse(USER_ADDRESS_FAKER,req.params.courseID)) {
            next({err:'not own this course'})
            return;
        }
        let course = await Course.findOne({_id:req.params.courseID})
        const pdfPath = path.join(__dirname, `../File/${req.params.courseID}.pdf`);
        res.download(pdfPath, `${course.courseName}.pdf`);
    },
    async viewCoursePage(req, res, next){
         let isValid = await ContractController.ownsNFTForCourse(USER_ADDRESS_FAKER,req.params.courseID)
        console.log(isValid)
        if(!isValid) {
            next('not own this course')
            return;
        }
        console.log('here')
        res.sendFile(path.resolve(__dirname, '../client/html', 'course.html'));
    },
}

module.exports = CourseController;