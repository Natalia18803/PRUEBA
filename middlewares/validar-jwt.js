import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const validarJWT = async (req, res, next) => {
    // 1. Obtener el token del header (x-token o Authorization)
    let token = req.header('x-token');
    
    // Si no viene en x-token, buscar en Authorization: Bearer <token>
    if (!token && req.header('Authorization')) {
        const authHeader = req.header('Authorization');
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }
    
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
        const isSubscribed = await usuario.isMembershipActive();
        req.usuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            estado: isSubscribed ? 'activo' : 'inactivo', 
            rol: usuario.rol,
            membresiaActiva: isSubscribed
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
