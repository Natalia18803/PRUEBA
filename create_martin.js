import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.connect('mongodb://localhost:27017/numerologia')
    .then(async () => {
        const hashedPassword = await bcrypt.hash('999999999', 10);
        const result = await mongoose.connection.db.collection('usuarios').updateOne(
            { email: 'martin@example.com' },
            {
                $set: {
                    nombre: 'Martin',
                    password: hashedPassword,
                    rol: 'usuario',
                    estado: 'activo',
                    fecha_nacimiento: new Date('1990-01-01T00:00:00.000Z'),
                    fecha_registro: new Date()
                }
            },
            { upsert: true }
        );
        console.log("Usuario martin@example.com creado/actualizado exitosamente como 'usuario'.");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
