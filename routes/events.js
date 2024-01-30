/*
events routes
*/
const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const {isDate} = require('../helpers/isDate');

const router = Router();

//Indicamos que todas las rutas de abajo pasaran primero por validarJWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear nuevo evento
router.post('/', 
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

//Actualizar nuevo evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;