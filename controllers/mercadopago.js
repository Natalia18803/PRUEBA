import { configureMercadoPago, mercadopago } from '../config/mercadopago.js';
import Pago from '../models/pago.js';

export const crearPreferencia = async (req, res) => {
    try {
        const { titulo = 'Suscripción Celestial', monto } = req.body;
        const usuarioId = req.usuario.id;

        if (!monto || isNaN(monto)) {
            return res.status(400).json({ error: 'El monto es obligatorio y numérico' });
        }

        configureMercadoPago();

        // Detectar la URL actual del servidor dinámicamente — funciona con cualquier URL de Vercel
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        const backendUrl = `${protocol}://${host}`;
        
        // Para el frontend usamos la misma URL base (mismo dominio)
        const frontendUrl = process.env.FRONTEND_URL || backendUrl;

        const preference = await mercadopago.preferences.create({
            items: [{
                title: titulo,
                quantity: 1,
                unit_price: Number(monto),
                currency_id: "COP"
            }],
            back_urls: {
                success: `${frontendUrl}/#/dashboard?payment=success`,
                failure: `${frontendUrl}/#/dashboard?payment=failure`,
                pending: `${frontendUrl}/#/dashboard?payment=pending`
            },
            auto_return: "approved",
            external_reference: usuarioId,
            notification_url: `${backendUrl}/api/mercadopago/webhook`
        });

        res.json({
            success: true,
            init_point: preference.body.init_point,
            sandbox_init_point: preference.body.sandbox_init_point
        });
    } catch (error) {
        console.error('SERVER ERROR (Mercado Pago API):', error);
        res.status(500).json({ error: 'Error del servidor al conectar con Mercado Pago', detalles: error.message });
    }
};

export const recibirNotificacion = async (req, res) => {
    try {
        // MP envía datos via Query (IPN) o Body JSON (Webhooks)
        const type = req.query.type || req.query.topic || req.body?.type || req.body?.topic;
        const paymentId = req.query['data.id'] || req.query.id || req.body?.data?.id;

        // Validar que tengamos un ID válido de un evento de pago
        if ((type === "payment" || type === "payment.created" || type === "payment.updated") && paymentId) {
            
            configureMercadoPago();
            
            // Buscar la información completa del pago en MP
            const payment = await mercadopago.payment.findById(paymentId);
            const data = payment.body;
            
            if (data.status === 'approved') {
                const usuarioId = data.external_reference;
                
                // Evitar cobros dobles si MercadoPago envía el webhook dos veces
                const existe = await Pago.findOne({ mercadopago_id: paymentId });
                if (!existe) {
                    const fecha_vencimiento = new Date();
                    fecha_vencimiento.setDate(fecha_vencimiento.getDate() + 30); // 30 días de suscripción
                    
                    const nuevoPago = new Pago({
                        usuario_id: usuarioId,
                        monto: data.transaction_amount,
                        metodo: data.payment_type_id || 'mercadopago',
                        fecha_vencimiento,
                        mercadopago_id: paymentId,
                        estado_pago: 'aprobado'
                    });
                    
                    await nuevoPago.save();
                    
                    // Actualizamos explícitamente el "estado" a 'activo' para los dashboards
                    import('../models/usuario.js').then(async ({ default: Usuario }) => {
                        await Usuario.findByIdAndUpdate(usuarioId, { estado: 'activo' });
                    }).catch(console.error);

                    console.log(`✅ [Webhook] Pago exitoso ID: ${paymentId} vinculado al usuario ${usuarioId}`);
                }
            } else {
                console.log(`⚠️ [Webhook] Pago ID: ${paymentId} en estado ${data.status}`);
            }
        }
        res.status(200).send("OK");
    } catch (error) {
        console.error("❌ Error procesando el Webhook HTTP de MP:", error.message);
        // Devolvemos 200 siempre, para que MP deje de insistir y sature nuestro servidor
        res.status(200).send("Processed with soft failures");
    }
};
