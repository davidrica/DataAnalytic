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
            res.status(201).json({
                ok:true,
                msg:error
            })    
            
        }



    
}

const getEmpresas = async (req,res=response)=>{
    try {
        const empresas = await Empresa.find()

        res.status(201).json({
            ok:true,
            empresas:empresas
        })    
            
    } catch (error) {
        console.log(error)
        
    }


}
const agregarSideItem = async (req,res=response)=>{

    const {cuit}= req.body
    
    try {
        let empresa = await Empresa.findOne({cuit})
        const {titulo,link} = req.body
        const sideitem ={titulo,link}
        if (!empresa){
            return res.status(400).json({
                ok:false,
                msg:"La Empresa no Existe"
            })
        }

        const existe = empresa.sideitems.find((side) => side.titulo === titulo || side.link === link);
        if (existe) {
            return res.status(400).json({
                ok:false,
                msg:"Ya existe el titulo o Link "
            })

            
        }
        empresa.sideitems.push(sideitem)
        const empresaActualizado = await Empresa.findByIdAndUpdate(empresa.id,empresa,{new:true})

        res.status(201).json({
            ok:true,
            empresaActualizado
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
    crearEmpresa,
    agregarSideItem,
    getEmpresas
}