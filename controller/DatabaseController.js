const mongoose=require('mongoose');
async function connect(envi)
{   
    try {
        await mongoose.connect(envi,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName: 'main'
        });
        console.log("mongo succeeded")
    } catch (error) {
        console.log(error)
    }
}
module.exports={connect}