const mongoose = require("mongoose");

async function conenctionToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Conneected to MongoDB");
    } catch(err) {
        console.log(`Connection error: ${err.message}`);
    }
}

module.exports = conenctionToMongoDB