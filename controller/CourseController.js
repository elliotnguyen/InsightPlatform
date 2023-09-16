const mongoose = require("mongoose");
const Course = require("../model/Course");
const ContractController = require("./ContractController");
const path = require('path');
const CourseController = {
    addCourse: async (req, res, next) => {
        if (!req.body.courseName || !req.body.lecturer || !req.body.price) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return false;
        }

        const newCourse = new Course({
            _id: new mongoose.Types.ObjectId,
            courseName: req.body.courseName,
            lecturer: req.body.lecturer,
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
            return false;
        }
        res.send({
            success: true,
            message: "successfully",
            course: newCourse
        });
        return true
    },

    getDetails: async (req, res, next) => {
        console.log(req.params.courseID)
        if(!ContractController.ownsNFTForCourse(req.user.address,req.params.courseID)) {
            next({err:'not own this course'})
            return;
        }
        try {
            const courseDetails = await Course.findOne({ _id: req.params.courseID })
                .populate('lecturer', '_id userName email'); // Specify the fields you want to populate from the User model
    
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
        if(!ContractController.ownsNFTForCourse(req.user.address,req.params.courseID)) {
            next({err:'not own this course'})
            return;
        }
        let course = await Course.findOne({_id:req.params.courseID})
        const pdfPath = path.join(__dirname, `../File/${req.params.courseID}.pdf`);
        res.download(pdfPath, `${course.courseName}.pdf`);
        
    },
    async viewCoursePage(req, res, next){
        let isValid = await ContractController.ownsNFTForCourse(req.user.address,req.params.courseID)
        console.log(isValid)
        if(!isValid) {
            next('not own this course')
            return;
        }
        console.log('here')
        res.sendFile(path.resolve(__dirname, '../client/html', 'course.html'));

    },
    async earnCertPage(req,res,next){
        res.sendFile(path.resolve(__dirname, '../client/html', 'game.html'));
    }
}

module.exports = CourseController;