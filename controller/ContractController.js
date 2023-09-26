const Transaction = require("../Helper/Transaction");
const Question = require("../model/Question");
const CourseController = require("./CourseController");
const NFTController = require("./NFTController");
const QuestionController = require("./QuestionController");
const USER_ADDRESS_FAKER = "0x301d50321d084e9457ec42E6723694EdA6A6eC55"
class ContractController {
    async getTotalCourses(req, res, next) {
        const totalCourses = await Transaction.runReadingFunction('getTotalCourses', []);
        res.json({
            message: 'Invalid user to change into partner',
            totalCourses: Number(totalCourses),
            success: false
        })
        return;
    }

    async addCourse(req, res, next) {
        // const isValidCourse = CourseController.addCourse(req,res,next);
        // if(!isValidCourse) return;
        const course = {
            courseID: req.body.courseID,
            price: req.body.price, // Example price in wei (1 ether)
        };

        
        var result = await Transaction.runWritingFunction("addCourse", [course])
        console.log(result)
        if (!result) return;
        // NFTController.addNFT(req,res,next);
        res.json({
            message: 'Invalid user to change into partner',
            res: result,
            success: true
        })

        return;
    }

    async mintNFT(req, res, next) {

        const functionName = 'mintNFT'; // Replace with the name of the function you want to call
        const functionArguments = ['0x301d50321d084e9457ec42E6723694EdA6A6eC55', 123]; // Replace with the arguments for the function
        let result = await Transaction.runWritingFunction(functionName, functionArguments)
        result = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        res.json({
            message: '....',
            res: result,
            success: true
        })
        return;

        // metadataJson={}
        // .get("abcccccccccc",metadataJson)
    }

    async buyCourse(req, res, next) {

        const functionName = 'buyCourse'; // Replace with the name of the function you want to call
        const functionArguments = ['123']; // Replace with the arguments for the function
        console.log('hwre')
        let result = await Transaction.runWritingFunction(functionName, functionArguments, 3000)
        const inputs = [
            { type: "string", name: "courseID" },
            { type: "address", name: "buyer", indexed: true },
            { type: "uint256", name: "price" },
            { type: "uint256", name: "tokenID" }
        ];
        let eventDataForMint = await Transaction.getEventDataFromTransactionHash(result.transactionHash, "CourseBought(string,address,uint256,uint256)", inputs)
        console.log(eventDataForMint)
        res.json({
            message: '....',
            res: eventDataForMint,
            success: true
        })
    }

    async fundContract(req, res, next) {

        const functionName = 'fundContract'; // Replace with the name of the function you want to call
        const functionArguments = []; // Replace with the arguments for the function
        console.log('hwre')
        let result = await Transaction.runWritingFunction(functionName, functionArguments, 100)
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }

    async withDrawContract(req, res, next) {

        const functionName = 'withDrawFunds'; // Replace with the name of the function you want to call
        const functionArguments = [100]; // Replace with the arguments for the function
        console.log('hwre')
        let result = await Transaction.runWritingFunction(functionName, functionArguments)
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }
    async getCourse(req, res, next) {

        const functionName = 'getCourseDetails'; // Replace with the name of the function you want to call
        const functionArguments = [125]; // Replace with the arguments for the function

        let result = await Transaction.runReadingFunction(functionName, functionArguments)
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }

    async getCourseIDs(req, res, next) {

        const functionName = 'getAllCourseIDs'; // Replace with the name of the function you want to call
        const functionArguments = []; // Replace with the arguments for the function

        let result = await Transaction.runReadingFunction(functionName, functionArguments)
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }

    async showFunds(req, res, next) {

        const functionName = 'showFunds'; // Replace with the name of the function you want to call
        const functionArguments = []; // Replace with the arguments for the function

        let result = await Transaction.runReadingFunction(functionName, functionArguments)
        result = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }

    async mintBatch(req, res, next) {

        const functionName = 'mintBatch'; // Replace with the name of the function you want to call
        const functionArguments = [2]; // Replace with the arguments for the function
        console.log('hwre')
        let result = await Transaction.runWritingFunction(functionName, functionArguments)
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }

    async ownsNFTForCourse(userAddress, courseID) {
        const functionName = 'ownsNFTForCourse'; // Replace with the name of the function you want to call
        const functionArguments = [userAddress, courseID]; // Replace with the arguments for the function

        let result = await Transaction.runReadingFunction(functionName, functionArguments)
        result = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        return result
    }
    async getURIToken(req, res, next) {
        const functionName = 'tokenURI'; // Replace with the name of the function you want to call
        const functionArguments = [0]; // Replace with the arguments for the function

        let result = await Transaction.runReadingFunction(functionName, functionArguments)
        result = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }


    async getURITokenforCertNFT(req, res, next) {
        const functionName = 'tokenURI'; // Replace with the name of the function you want to call
        const functionArguments = [0]; // Replace with the arguments for the function

        let result = await TransactionForCert.runReadingFunction(functionName, functionArguments)
        result = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        res.json({
            message: '....',
            res: result,
            success: true
        })
    }
    async setURIToken(req, res, next) {
        //check auth
        const functionName = 'ownsNFTForCourse'; // Replace with the name of the function you want to call
        const functionArguments = [USER_ADDRESS_FAKER, req.body.courseID]; // Replace with the arguments for the function

        let isAllowed = await Transaction.runReadingFunction(functionName, functionArguments)
        isAllowed = JSON.parse(JSON.stringify(isAllowed, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));
        if (!isAllowed) {
            res.json({
                message: 'Not permission to set URI request',
                success: false
            })
            return;
        }
        let nftSet = await NFTController.addNFT(req.body.courseID, req.body.uri)
        res.json(nftSet)
    }
    async getEventData(req, res, next) {
        let eventDataForMint = await Transaction.getEventDataFromTransactionHash(req.body.transactionHash, req.body.formattedEvent, req.body.inputs)
        console.log(eventDataForMint)
        res.json({
            message: '....',
            res: eventDataForMint,
            success: true
        })
    }
}

module.exports = new ContractController;