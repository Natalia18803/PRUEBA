import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Usuario from './models/usuario.js';
import 'dotenv/config';

async function crearAdmin() {
    try {
        console.log('Conectando a MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Natalia:kinher1013@natalia.ksrcic0.mongodb.net/Numerologia');
        
        const passwordHashed = await bcrypt.hash('admin123456', 10);
        
        const result = await Usuario.findOneAndUpdate(
            { email: 'admin@admin.com' },
            { 
                nombre: 'Administrador Principal',
                password: passwordHashed,
                rol: 'admin', 
                estado: 'activo',
                fecha_nacimiento: new Date('1990-01-01')
            },
            { upsert: true, new: true }
        );
        
        console.log("¡Administrador configurado con éxito!");
        console.log("Email: admin@admin.com");
        console.log("Contraseña: admin123456");
        console.log("Rol:", result.rol);
        process.exit(0);
    } catch (error) {
        console.error("Error al configurar admin:", error);
        process.exit(1);
    }
}

crearAdmin();
