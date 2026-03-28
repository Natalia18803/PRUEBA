import Usuario from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { enviarEmailBrevo, generarHtmlRecuperacion } from '../services/email.js';

/**
 * POST /api/auth/forgot-password
 * Genera un token temporal y envía email de recuperación
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'El email es obligatorio' });
        }

        const usuario = await Usuario.findOne({ email: email.toLowerCase() });

        // Por seguridad, siempre respondemos lo mismo (no revelamos si el email existe)
        if (!usuario) {
            return res.json({ message: 'Si el email existe, recibirás un enlace de recuperación.' });
        }

        // Generar token temporal de 15 minutos
        const resetToken = jwt.sign(
            { id: usuario._id.toString(), purpose: 'reset-password' },
            process.env.JWT_SECRET || 'secreto-temporal',
            { expiresIn: '15m' }
        );

        // Construir link de reseteo (usa la URL del frontend)
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${frontendUrl}/#/reset-password?token=${resetToken}`;

        // Enviar email
        await enviarEmailBrevo(
            usuario.email,
            '🔑 Recupera tu Llave Cósmica',
            generarHtmlRecuperacion(usuario.nombre, resetLink)
        );

        res.json({ message: 'Si el email existe, recibirás un enlace de recuperación.' });
    } catch (error) {
        console.error('[ForgotPassword] Error:', error.message);
        res.status(500).json({ error: 'Error del servidor al procesar la solicitud' });
    }
};

/**
 * POST /api/auth/reset-password
 * Valida el token y actualiza la contraseña
 */
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: 'Token y nueva contraseña son obligatorios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Verificar el token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto-temporal');
        } catch (err) {
            return res.status(400).json({ error: 'El enlace ha expirado o no es válido. Solicita uno nuevo.' });
        }

        if (decoded.purpose !== 'reset-password') {
            return res.status(400).json({ error: 'Token no válido para esta operación' });
        }

        // Buscar usuario y actualizar contraseña
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar contraseña (el pre-save hook la encripta automáticamente)
        usuario.password = password;
        await usuario.save();

        res.json({ message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.' });
    } catch (error) {
        console.error('[ResetPassword] Error:', error.message);
        res.status(500).json({ error: 'Error del servidor al resetear la contraseña' });
    }
};
