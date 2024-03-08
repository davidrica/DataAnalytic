const {model,Schema} = require('mongoose')

const SesionesSchema = Schema({
    coordinates:{
        latitude:String,
        longitude:String
    },
    ip:{type:String},
    isp:{type:String},
    host:{ip_address:String,prefix_len:String},
    status:{type:Boolean},
	country:{type:String},
	region:{type:String},
	city:{type:String},
	location:{type:String},
	area_code:{type:String},
	country_code:{type:String},
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:false

    },
})

module.exports = model('Sesiones',SesionesSchema)