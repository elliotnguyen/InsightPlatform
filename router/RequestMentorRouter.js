const router = require("express").Router();
const RequestMentorController = require("../controller/RequestMentorController");
const UserController = require("../controller/UserController");

router.post("/search", RequestMentorController.searchMentor);
router.post("/request", RequestMentorController.requestMentor);
router.post("/accept", RequestMentorController.acceptMentor);
router.post("/adduser", UserController.addUser);
router.post("/notification",RequestMentorController.searchRequest);
router.post("/deny", RequestMentorController.denyRequest);
module.exports = router;