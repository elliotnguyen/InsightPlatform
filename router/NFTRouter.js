const router = require("express").Router();
const nftController = require("../controller/NFTController");

router.post("/addnft", nftController.addNFT);

module.exports = router;