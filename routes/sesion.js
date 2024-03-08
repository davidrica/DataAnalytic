/*
    rutas de usuarios auth
    host + /api/session
*/

const {Router}= require('express');
const router = Router()

const {crearSesion} = require("../controllers/sesiones");
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT)

router.post(
    '/new',
    crearSesion
    )


module.exports = router