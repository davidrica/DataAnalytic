const {response} = require('express')
const Sesiones= require('../models/Sesiones');
const Usuario = require('../models/Usuario');

const crearSesion = async (req, res = response )=>{
        const {uid} = req;
 
        try {
            const {sid}=req.body
           
            let sesion  = await Sesiones.findById(sid)
            
            if (!sesion){
                return res.status(400).json({
                    ok:false,
                    msg:"No existe sesion"
                })
            }
            console.log(sid)
            const usuario = await Usuario.findById(uid)
            if (!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:"No existe usuario"
                })
            }
            console.log(usuario)
            
            sesion.usuario = usuario
          
            const sesionActualizado = await Sesiones.findByIdAndUpdate(sesion._id,sesion,{new:true})
            
            console.log(sesionActualizado)

            res.status(201).json({
                ok:true,
                sesionActualizado
            })    
               
        } catch (error) {
            console.log(error)
            res.status(201).json({
                ok:true,
                msg:error
            })    
            
        }



    
}

 
module.exports = {
    crearSesion,
}