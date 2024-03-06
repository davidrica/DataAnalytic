const {response} = require('express')
const bcrypt = require('bcryptjs')
const Empresa= require('../models/Empresa')
const {generarJWT} = require('../helpers/jwt')

const crearEmpresa = async (req, res = response )=>{
        const {cuit}= req.body

        try {
            let empresa = await Empresa.findOne({cuit})

            if (empresa){
                return res.status(400).json({
                    ok:false,
                    msg:"Cuit ya registrado"
                })
            }
            empresa = new Empresa(req.body)

            await empresa.save()

            res.status(201).json({
                ok:true,
                empresa:empresa
            })    
               
        } catch (error) {
            
        }



    
 }

 
module.exports = {
    crearEmpresa
}