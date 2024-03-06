const {model,Schema} = require('mongoose')

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true
    },
    password: {
        type: String,
        required:true
    },
    empresas:[{
            type:Schema.Types.ObjectId,
            ref:'Empresa',
            required:false

    }],
    
    
//    lastToken:{
//        type:String,
//    }
    
})



module.exports =model('Usuario',UsuarioSchema);
