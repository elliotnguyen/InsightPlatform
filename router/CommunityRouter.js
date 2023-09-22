const router = require("express").Router();
const CommunityController = require("../controller/CommunityController");

router.post("/addcommunity", CommunityController.addCommunity);

module.exports = router;