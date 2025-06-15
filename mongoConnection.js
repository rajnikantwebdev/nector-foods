const mongoose = require("mongoose")

const handleDbConnection = async () => {
    try {
        const client = await mongoose.connect(process.env.DB_URI)
        if(client) console.log("Db connected successfully")
    } catch (error) {
        console.log("Unable to connect to db, ", error)
    }
}

module.exports = handleDbConnection;