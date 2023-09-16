const router = require("express").Router();
const courseController = require("../controller/CourseController");


router.post("/addcourse", courseController.addCourse);
router.get("/data/:courseID", courseController.getDetails);

router.get('/download_course/:courseID',courseController.download);
router.get('/view/:courseID', courseController.viewCoursePage);
router.get('/earn_cert/:courseID', courseController.earnCertPage);


module.exports = router;