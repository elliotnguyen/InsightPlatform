const NFT = require("../model/NFT");

const MetadataController = {
    async conft(req, res, next) {
        try {
            const Metadata = await NFT.findOne({ uri: 'conft/' + req.params.tokenID }).exec();
            res.send(Metadata.metadata);
        }
        catch (err) {
            res.json({
                status: 404,
                message: "404 Not found",
                error: err
            })
        }

    }

}

module.exports = MetadataController;