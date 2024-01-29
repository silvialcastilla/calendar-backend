const {Router} = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//rutas de usuarios
 router.get('/', (req, res) => {
     res.json({"ok": true})
 });

 router.post('/new',
     [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener 6 caracteres').isLength({min: 6}),
        validarCampos
     ] ,  
     crearUsuario)

 router.post('/',
     [
        check('email', 'El email no tiene un formato correcto').isEmail(),
        check('password', 'El password debe de tener 6 caracteres').isLength({min: 6}),
        validarCampos
     ]
  ,loginUsuario )

 router.get('/renew', validarJWT, revalidarToken );


module.exports = router