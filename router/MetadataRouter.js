



// router.use(authMiddleware.isAdmin)

const router = require("express").Router();
const metadataController = require("../controller/MetadataController");

// router.get('/ccnft/:tokenID',metadataController.ccnft);
router.get('/conft/:tokenID',metadataController.conft);



module.exports = router
