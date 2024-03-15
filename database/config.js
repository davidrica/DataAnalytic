const mongoose= require("mongoose")

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log("Base de datos Conectado...")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection
}