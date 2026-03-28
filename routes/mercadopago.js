import express from 'express';
import { crearPreferencia, recibirNotificacion } from '../controllers/mercadopago.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = express.Router();

// Ruta de pago protegida (solo usuarios logueados pueden generar un enlace de pago)
router.post('/create_preference', validarJWT, crearPreferencia);

// Ruta pública (Webhook para que se comuniquen los servidores de Mercado Pago libremente)
router.post('/webhook', recibirNotificacion);

export default router;
