const {model,Schema} = require('mongoose')

const SideitemSchema = Schema({
    titulo:{
        type:String,
        required: true
    },
    link:{
        type:String,
        required:true
    }
})

module.exports = model('Sidelitem',SideitemSchema)