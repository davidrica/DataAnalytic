/*
    rutas de usuarios auth
    host + /api/auth
*/
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router()

const {crearUsuario,revalidarToken,loginUsuario,asignarEmpresa} = require('../controllers/auth')

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio. Mayor a 4 caracteres').not().isEmpty().isLength({min:4}),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
    )

router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
    )

router.put('/:idusuario/:idempresa',validarJWT,asignarEmpresa)

router.get('/renew',validarJWT,revalidarToken)



module.exports= router;