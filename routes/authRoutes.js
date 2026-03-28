import express from 'express';
import { body } from 'express-validator';
import * as authControllers from '../controllers/authControllers.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = express.Router();

// POST /api/auth/registro - Registrar nuevo usuario
router.post('/registro', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    body('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    body('fecha_nacimiento', 'Debe ser una fecha válida').isISO8601().toDate(),
    body('fecha_nacimiento').custom((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error('La fecha proporcionada no es válida');
        }
        if (date > new Date()) {
            throw new Error('La fecha de nacimiento no puede ser futura');
        }
        return true;
    }),
    validarCampos
], authControllers.registro);

// POST /api/auth/login - Login de usuario
router.post('/login', [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], authControllers.login);

// GET /api/auth - Obtener usuario autenticado
router.get('/', validarJWT, authControllers.obtenerUsuario);

export default router;
