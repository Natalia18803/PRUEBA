import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const validarJWT = async (req, res, next) => {
    // 1. Obtener el token del header
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({ 
            error: 'No hay token en la petición' 
        });
    }

    try {
        // 2. Verificar el token
        const { id } = jwt.verify(token, process.env.JWT_SECRET || 'secreto-temporal');
        
        // 3. Buscar el usuario en la BD (Zero-Trust: No confiamos solo en el token)
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(401).json({ 
                error: 'Token no válido - usuario no existe en BD' 
            });
        }

        // 4. Inyectar la información REAL y ACTUALIZADA del usuario
        req.usuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado, // Mantenemos el campo por compatibilidad, pero...
            rol: usuario.rol,
            membresiaActiva: await usuario.isMembershipActive() // ...añadimos el estado real-time
        };
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ 
            error: 'Token no válido o expirado' 
        });
    }
};

export { validarJWT };
