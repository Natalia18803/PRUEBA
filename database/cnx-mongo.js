import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

// Caché global para mantener la conexión viva entre ejecuciones en Vercel
let isConnected = false;

async function conectarMongo() {
    if (isConnected) {
        return;
    }
    
    // Si ya está conectado, no intentamos conectar de nuevo (Optimización para Vercel)
    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }
    
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, 
        });
        isConnected = true;
        console.log('Conectado exitosamente a MongoDB con Mongoose');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error; // Propagamos el error para que la ruta aborte indicándolo correctamente
    }
}

export { conectarMongo };
