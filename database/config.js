const mongoose= require("mongoose")

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log("Data Base connect...")
    } catch (error) {
        
    }
}

module.exports = {
    dbConnection
}