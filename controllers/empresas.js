const {response} = require('express')
const bcrypt = require('bcryptjs')
const Empresa= require('../models/Empresa')
const {generarJWT, obtenerIframe} = require('../helpers/jwt')



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
        empresas=empresas.map((empresa)=>{
            empresa.sideitems.map((side)=>{
                side.link= obtenerIframe(side.key)
                return side
            })
            return empresa
        })
        // empresas.forEach( function( empresa ) {
        //     empresa.sideitems.forEach(function(side){
        //         if (side.key>0){
            
        //             
                    
        //         }
        
                
        //     })
            
        //  } )
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
        let {titulo,link,key} = req.body
        

        if (!empresa){
            return res.status(400).json({
                ok:false,
                msg:"La Empresa no Existe"
            })
        }
        
        if (key>0){
            
            link = obtenerIframe(key)
            
        }
        
        const sideitem ={titulo,link,key}

        const existe = empresa.sideitems.find((side) => side.titulo === titulo || side.link === link || side.key === key );
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