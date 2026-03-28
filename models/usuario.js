import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'inactivo'
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

// Middleware para encriptar password antes de guardar
usuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;
    const salt = await bcrypt.genSalt(rounds);
    this.password = await bcrypt.hash(this.password, salt);
});

// Metodo para comparar passwords
usuarioSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Metodo para verificar membresía activa (Lógica de Negocio Real-Time)
usuarioSchema.methods.isMembershipActive = async function() {
    // Buscamos el último pago de este usuario
    const Pago = mongoose.model('Pago');
    const ultimoPago = await Pago.findOne({ usuario_id: this._id }).sort({ fecha_pago: -1 });
    
    if (!ultimoPago) return false;
    
    const hoy = new Date();
    return ultimoPago.fecha_vencimiento > hoy;
};

export default mongoose.model('Usuario', usuarioSchema);
