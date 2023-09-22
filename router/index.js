const router = require('express').Router();
const courseRouter = require("./CourseRouter");
const questionRouter = require("./QuestionRouter");
const nftRouter = require("./NFTRouter");
const contractRouter =  require("./ContractRouter");
const communityRouter = require("./CommunityRouter");
const resourceRouter = require("./ResourceRouter");


router.use("/course", courseRouter);
router.use("/question", questionRouter);
router.use("/nft", nftRouter);
router.use("/contract", contractRouter);
router.use("/community", communityRouter);
router.use("/resource", resourceRouter);

router.use((err, req, res, next) => {
    if (err) res.status(400).send(err)
});

router.use('/', (req, res, next) => {
    res.status(404).send({error:"Page not found."})
});

module.exports = router;