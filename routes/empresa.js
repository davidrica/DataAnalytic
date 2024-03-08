/*
    rutas de usuarios auth
    host + /api/auth
*/

const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router()

const {crearEmpresa,agregarSideItem, getEmpresas} = require("../controllers/empresas")


router.use(validarJWT)

router.post(
    '/new',
    [
        check('nombre','El nombre es obligatorio y mayor de 4 caracteres').not().isEmpty().isLength({min:4}),
        check('cuit','El cuit es obligatorio y mayor de 11 caracteres').not().isEmpty().isLength({min:11}),
        validarCampos,
    ],
    crearEmpresa
    )

router.put(
    '/addsideitem',
    agregarSideItem
)
router.get('/',getEmpresas)


module.exports = router