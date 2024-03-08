require('dotenv').config()

const express = require("express");
const {dbConnection} = require("./database/config")
const cors = require("cors")

const app = express();

//mongo deb
dbConnection()
 
//cors
app.use(cors())
//dir public
app.use(express.static('public'))
//parse read
app.use(express.json())

//routes
app.use('/api/auth',require('./routes/auth'));

app.use('/api/empresa',require('./routes/empresa'));

app.use('/api/session',require('./routes/sesion'));

app.get('*',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server run on port: ${process.env.PORT}`)
})