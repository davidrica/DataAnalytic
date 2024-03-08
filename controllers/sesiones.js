const {response} = require('express')
const Sesiones= require('../models/Sesiones');
const Usuario = require('../models/Usuario');

const crearSesion = async (req, res = response )=>{
        const {uid} = req;
        try {
            let sesion = new Sesiones(req.body)

            
            const usuario = await Usuario.findById(uid)
            if (!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:"No existe usuario"
                })
            }

            
            sesion.usuario = usuario
            await sesion.save()

            res.status(201).json({
                ok:true,
                sesion:sesion
            })    
               
        } catch (error) {
            res.status(201).json({
                ok:true,
                msg:error
            })    
            
        }



    
}

 
module.exports = {
    crearSesion,
}