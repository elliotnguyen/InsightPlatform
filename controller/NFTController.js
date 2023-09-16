const mongoose = require("mongoose");
const NFT = require("../model/NFT");
const Course = require("../model/Course");
const User = require("../model/User");

const NFTController = {
    addNFT: async (courseID,uri) => {
        
        const courseDetails = await Course.findOne({_id: courseID}).exec();
        if (!courseDetails){
            return({
                error:'Course does not exist'
            })
        }
        const lecturerId = courseDetails.lecturer;
        const lecturer = []
        for (id of lecturerId) {
            lecturer.push(await User.findOne({_id: id}).select("userName"));
        }

        const newNFT = new NFT({
            _id: new mongoose.Types.ObjectId,
            uri: uri,
            metadata: {
                name: "Name NFT",
                description: "Description",
                image: "[image url]",
                externalUrl: "[website to learn more about the NFT]",
                attributes: [
                    {traitType: "course", value: {id: courseID, courseName: courseDetails.courseName}},
                    {traitType: "lecturer", value: lecturer}
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