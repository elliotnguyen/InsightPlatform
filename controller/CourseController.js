const mongoose = require("mongoose");
const Course = require("../model/Course");
const ContractController = require("./ContractController");
const path = require('path');
const { query } = require("express");
const { parseQuery } = require("./utils");

const CourseController = {
    addCourse: async (req, res, next) => {
        if (!req.body.courseName || !req.body.uploader || !req.body.price) {
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
            uploader: req.body.uploader,
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
        try {
            const query = await parseQuery(req.query);
            const courseDetails = await Course.find(query);
            console.log(query);

            res.status(200).json({
                success: true,
                courseDetails: courseDetails
            });
        } catch (err) {
            next({
                success: false,
                message: "Couldn't find course.",
                error: err
            });
            return;
        }
    },
    async download(req, res, next){
        if(!ContractController.ownsNFTForCourse(req.user.address,req.params.courseID)) {
            next({err:'not own this course'})
            return;
        }
        let course = await Course.findOne({_id:req.params.courseID})
        const pdfPath = path.join(__dirname, `../File/${req.params.courseID}.pdf`);
        res.download(pdfPath, `${course.courseName}.pdf`);
        
    },
    async viewCoursePage(req, res, next){
        // let isValid = await ContractController.ownsNFTForCourse(req.user.address,req.params.courseID)
        // console.log(isValid)
        // if(!isValid) {
        //     next('not own this course')
        //     return;
        // }
        // console.log('here')
        // res.sendFile(path.resolve(__dirname, '../client/html', 'course.html'));
    },
    // async earnCertPage(req,res,next){
    //     res.sendFile(path.resolve(__dirname, '../client/html', 'game.html'));
    // }
}

module.exports = CourseController;