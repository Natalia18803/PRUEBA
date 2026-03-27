import express from 'express';
const router = express.Router();
import * as lecturaControllers from '../controllers/lecturaControllers.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeUsuarioPorId } from '../helpers/usuario.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRol } from '../middlewares/validar-rol.js';
import { validarEstado } from '../middlewares/validar-estado.js';

// Todas las rutas de lecturas requieren autenticación
router.use(validarJWT);

// ==========================================
//  RUTAS DE LECTURAS - SOLO ADMIN
// ==========================================

// GET todas las lecturas - Solo admin
router.get('/', validarRol('admin'), lecturaControllers.getAllLecturas);

// Ruta genérica con parámetro (debe ir AL FINAL) - Solo admin
router.get('/:id', 
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos,
  validarRol('admin'),
  lecturaControllers.getLecturaById
);

// ==========================================
//  RUTAS DE LECTURAS - USUARIO ACTIVO (con pago)
// ==========================================

// Rutas con segmentos estáticos (deben ir ANTES de /:id) - Requiere estado activo
router.get('/usuario/:usuario_id', 
  check('usuario_id', 'No es un ID válido').isMongoId(),
  check('usuario_id').custom(existeUsuarioPorId),
  validarCampos,
  validarEstado,
  lecturaControllers.getLecturasByUsuario
);

router.post('/principal/:usuario_id', 
  check('usuario_id', 'No es un ID válido').isMongoId(),
  check('usuario_id').custom(existeUsuarioPorId),
  validarCampos,
  validarEstado,
  lecturaControllers.generarLecturaPrincipal
);

router.post('/diaria/:usuario_id', 
  check('usuario_id', 'No es un ID válido').isMongoId(),
  check('usuario_id').custom(existeUsuarioPorId),
  validarCampos,
  validarEstado,
  lecturaControllers.generarLecturaDiaria
);

export default router;
