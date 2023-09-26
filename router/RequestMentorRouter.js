const router = require("express").Router();
const RequestMentorController = require("../controller/RequestMentorController");

router.get("/search", RequestMentorController.searchMentor);
router.post("/request", RequestMentorController.requestMentor);
router.post("/accept", RequestMentorController.acceptMentor);

module.exports = router;