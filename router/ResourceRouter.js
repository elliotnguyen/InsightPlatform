const router = require("express").Router();
const ResourceController = require("../controller/ResourceController");

router.post("/addresource", ResourceController.addResource);

module.exports = router;