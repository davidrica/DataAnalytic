const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const Empresa = require('../models/Empresa')
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async (req, res = response )=>{

    const {email,password}=req.body
    
    try {
        let usuario = await Usuario.findOne({email})

        if (usuario){
            return res.status(400).json({
                ok:false,
                msg:'Email ya registrado.',
            })    
        }
        
        usuario= new Usuario(req.body)
        
        const salt = bcrypt.genSaltSync()
        
        usuario.password =bcrypt.hashSync(password,salt);


        await usuario.save()
        const token = await generarJWT(usuario.id,usuario.name)
        //lasttoken para limitar quien ingreso
        //usuario.lastToken=token
        //usuario.save()
        
        res.status(201).json({
             ok:true,
             uid: usuario.id,
             name: usuario.name,
             token
         })    

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador DB',

        })
    }
    
}

const loginUsuario =async (req, res = response )=>{
    const {email,password}=req.body

    try {
        const usuario = await Usuario.findOne({email})

        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Usuario y/o Password incorrectos.',
            })    
        }

        const validPassword = bcrypt.compareSync(password,usuario.password)
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Usuario y/o Password incorrectos...',
            })    
        }

        const token = await generarJWT(usuario.id,usuario.name)

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })    




    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador DB',

        })
        
    }


}

const revalidarToken =async (req, res = response ) => {
    
    const {uid,name} = req;

    const token = await generarJWT(uid,name);



    res.json({
         ok:true,
         uid,name,
         token
     })
}

const asignarEmpresa = async (req,res=response)=>{
    const id = req.params.idusuario
    const idEmpresa = req.params.idempresa
    try {
        const usuario = await Usuario.findById(id)
        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg:"No existe usuario"
            })
        }
        
        const empresa = await Empresa.findById(idEmpresa)
        if (!empresa){
            return res.status(400).json({
                ok:false,
                msg:"No existe empresa"
            })
        }
        
        if (!usuario.empresas.includes(idEmpresa)){
            usuario.empresas.push(empresa)
        }
        

                
        
        
        
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id,usuario,{new:true})

        

        res.status(200).json({
            ok:true,
            usuarioActualizado
        })    
    } catch (error) {
        console.log(error)
    }   
    
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario,
    asignarEmpresa
}