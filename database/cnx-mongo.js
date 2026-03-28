import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

async function conectarMongo() {
    // Si ya está conectado, no intentamos conectar de nuevo (Optimización para Vercel)
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    
    try {
        await mongoose.connect(uri);
        console.log('Conectado exitosamente a MongoDB con Mongoose');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        // No lanzamos error aquí para evitar que crashee todo el serverless si es temporal
    }
}

export { conectarMongo };
