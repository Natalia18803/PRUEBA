import mongoose from 'mongoose';

const pagoSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    monto: {
        type: Number,
        required: true,
        min: 0
    },
    fecha_pago: {
        type: Date,
        default: Date.now
    },
    fecha_vencimiento: {
        type: Date,
        required: true
    },
    metodo: {
        type: String,
        required: true
    },
    mercadopago_id: {
        type: String,
        unique: true,
        sparse: true
    },
    estado_pago: {
        type: String,
        default: 'pendiente'
    }
});

export default mongoose.model('Pago', pagoSchema);
