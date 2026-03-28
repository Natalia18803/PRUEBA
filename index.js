import 'dotenv/config';
import express from 'express';
import path from 'path';
import { conectarMongo } from './database/cnx-mongo.js';
import cors from 'cors'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import Usuario from './models/usuario.js';

// Configuración de __dirname para Módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validar variables de entorno críticas
if (!process.env.JWT_SECRET) {
    console.error('CRITICAL ERROR: JWT_SECRET no está definido en el archivo .env');
    process.exit(1);
}

import usuarioRoutes from './routes/usuarioRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js';
import lecturaRoutes from './routes/lecturaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mercadopagoRoutes from './routes/mercadopago.js';
import { validarJWT } from './middlewares/validar-jwt.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token']
}));

// 1. Indicar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB de forma segura para Serverless (Vercel)
app.use(async (req, res, next) => {
    try {
        await conectarMongo();
        next();
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor (Base de datos)' });
    }
});

// Helper para generar token
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secreto-temporal', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// Eliminadas rutas inline de auth - Movidas a routes/authRoutes.js

// Otras rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/lecturas', lecturaRoutes);
app.use('/api/mercadopago', mercadopagoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Numerologia funcionando - Registro sin token requerido');
});

// Ruta de health check
app.get('/api/health', async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        if (state === 1) {
            res.status(200).json({ status: 'OK', message: 'Base de datos conectada' });
        } else {
            res.status(500).json({ status: 'ERROR', message: 'Base de datos no conectada' });
        }
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: 'Error verificando conexion' });
    }
});

// 2. Manejar rutas del Frontend (Importante para SPAs como React o Vue)
// Esto asegura que si refrescas la página en /dashboard, el backend devuelva el index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware Global de Manejo de Errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        ok: false,
        message: 'Ocurrió un error inesperado en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Iniciar servidor solo si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log('');
        console.log('RUTAS PUBLICAS (sin token):');
        console.log('  POST /api/auth/registro - Registro de usuario');
        console.log('  POST /api/auth/login    - Login de usuario');
        console.log('');
        console.log('RUTAS PROTEGIDAS (con token):');
        console.log('  GET  /api/auth          - Obtener usuario autenticado');
        console.log('  /api/usuarios/*         - Rutas de usuarios');
        console.log('  /api/pagos/*            - Rutas de pagos');
        console.log('  /api/lecturas/*         - Rutas de lecturas');
    });
}

export default app;
