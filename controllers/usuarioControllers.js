import Usuario from '../models/usuario.js';
import Pago from '../models/pago.js';
import jwt from 'jsonwebtoken';

// Helper para generar el Token (Asegúrate de tener JWT_SECRET en tu .env)
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secreto-temporal', {
        expiresIn: '30d'
    });
};

// Rutas de autenticacion (registro/login) eliminadas, ahora están en authControllers.js

// --- RUTAS DE GESTIÓN (CRUD) ---

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        
        // Añadir estado de membresía dinámico a cada usuario para el admin
        const usuariosConEstado = await Promise.all(usuarios.map(async (u) => {
            const isSubscribed = await u.isMembershipActive();
            return {
                ...u._doc,
                estado: isSubscribed ? 'activo' : 'inactivo',
                isSubscribed
            };
        }));

        res.json({ usuarios: usuariosConEstado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { nombre, email, fecha_nacimiento, rol, estado, forcePremium } = req.body;
        const updateData = { nombre, email, fecha_nacimiento };
        
        // Solo permitir actualizar rol y estado si vienen en el body (útil para admin)
        if (rol) updateData.rol = rol;
        if (estado) updateData.estado = estado;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id, 
            updateData,
            { new: true }
        ).select('-password');
        
        // Lógica de Otorgar Suscripción Manual (por 1 mes)
        if (forcePremium) {
            const vencimiento = new Date();
            vencimiento.setMonth(vencimiento.getMonth() + 1);
            
            const pagoManual = new Pago({
                usuario_id: req.params.id,
                monto: 0,
                fecha_vencimiento: vencimiento,
                metodo: 'Suscripción Manual (Admin)',
                estado_pago: 'aprobado'
            });
            await pagoManual.save();
        }
        
        res.json({ message: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEstadoUsuario = async (req, res) => {
    try {
        const { estado } = req.body;
        await Usuario.findByIdAndUpdate(req.params.id, { estado });
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
