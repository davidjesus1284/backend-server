/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {get, getAll, create, update, remove } = require('../controller/users.controller');
const { valdateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/:id', get);
router.get('/', getAll);
router.post('/', [
    check('email', 'El correo debe ser obligatorio')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('El correo es inválido'),

    check('dni', 'El DNI debe ser obligatorio')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('El DNI debe contener solo números')
    .isLength({ max: 8 })
    .withMessage('El DNI no puede ser mayor a 8 números'),

    check('celular', 'El numero de celular es requerido')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('El celular debe ser solo números'),

    check('nombre', 'El nombre debe ser obligatorio')
    .not()
    .isEmpty()
    .isLength({ max: 50 })
    .withMessage('El nombre no debe contener más de 50 caracteres'),
    valdateFields
], create);
router.put('/:id', [
    check('email', 'El correo debe ser obligatorio')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('El correo es inválido'),

    check('dni', 'El DNI debe ser obligatorio')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('El DNI debe contener solo números')
    .isLength({ max: 8 })
    .withMessage('El DNI no puede ser mayor a 8 números'),

    check('celular', 'El numero de celular es requerido')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('El celular debe ser solo números'),

    check('nombre', 'El nombre debe ser obligatorio')
    .not()
    .isEmpty()
    .isLength({ max: 50 })
    .withMessage('El nombre no debe contener más de 50 caracteres'),
    valdateFields
], update);
router.delete('/:id', remove);

module.exports = router;