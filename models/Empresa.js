const {model,Schema} = require("mongoose");

const EmpresaSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    cuit: {
        type:String,
        required:true,
        unique:true,
    },
    urlimagen:{
        type:String
    },
    activa:{
        type:Boolean,
        default:true
    }
})

EmpresaSchema.method('toJSON',function(){
    const {__v,_id,...object} = this.toObject()
    object.id= _id;
    return object
})


module.exports= model('Empresa',EmpresaSchema)