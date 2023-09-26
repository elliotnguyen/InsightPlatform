const mongoose = require("mongoose");
const NFT = require("../model/NFT");
const Course = require("../model/Course");
const User = require("../model/User");

const NFTController = {
    addNFT: async (courseID,uri) => {
        
        const courseDetails = await Course.findOne({_id: courseID}).populate('uploader', '_id name metamaskId');;
        if (!courseDetails){
            return({
                error:'Course does not exist'
            })
        }
        const newNFT = new NFT({
            _id: new mongoose.Types.ObjectId,
            uri: uri,
            metadata: {
                name: "CourseOpening NFT",
                description: courseDetails.description,
                image: "[image url]",
                externalUrl: "[website to learn more about the NFT]",
                attributes: [
                    {traitType: "course", value: {id: courseID, courseName: courseDetails.courseName}},
                    {traitType: "uploader", value: courseDetails.uploader.name}
                ]
            }
        });

        try {
            await newNFT.save();
        } catch (err) {
            return({
                success: false,
                message: "NFT insertion failed."
            });
        }
        return {
            success: true,
            message: "successfully",
            NFT: newNFT
        };
    }
    
}

module.exports = NFTController;