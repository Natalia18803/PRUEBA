import { configureMercadoPago, mercadopago } from '../config/mercadopago.js';
import Pago from '../models/pago.js';
import Usuario from '../models/usuario.js';

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
                unit_price: Number(Number(monto).toFixed(2)),
                currency_id: "COP"
            }],
            back_urls: {
                success: `${frontendUrl}/#/dashboard?payment=success`,
                failure: `${frontendUrl}/#/dashboard?payment=failure`,
                pending: `${frontendUrl}/#/dashboard?payment=pending`
            },
            auto_return: "approved",
            external_reference: String(usuarioId),
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
        console.log("🔔 [MercadoPago Webhook] Notificación recibida:", JSON.stringify({ query: req.query, body: req.body }));

        // MP puede enviar el ID de pago en la query (IPN) o en el body (Webhooks)
        const type = req.query.type || req.query.topic || req.body?.type || req.body?.topic || req.body?.action;
        const paymentId = req.query['data.id'] || req.query.id || req.body?.data?.id;

        // Validar que tengamos un ID de pago
        if (paymentId && (type === "payment" || type === "payment.created" || type === "payment.updated")) {
            
            configureMercadoPago();
            
            // Buscar la información completa del pago en MP (Usando .get() para SDK v1.x)
            const payment = await mercadopago.payment.get(paymentId);
            const data = payment.body;
            
            if (data.status === 'approved') {
                const usuarioId = data.external_reference;
                
                // Evitar cobros dobles
                const existe = await Pago.findOne({ mercadopago_id: paymentId });
                if (!existe) {
                    const fecha_vencimiento = new Date();
                    fecha_vencimiento.setDate(fecha_vencimiento.getDate() + 30);
                    
                    const nuevoPago = new Pago({
                        usuario_id: usuarioId,
                        monto: data.transaction_amount,
                        metodo: data.payment_type_id || 'mercadopago',
                        fecha_vencimiento,
                        mercadopago_id: paymentId,
                        estado_pago: 'aprobado'
                    });
                    
                    await nuevoPago.save();
                    
                    // Asegurar que el usuario quede ACTIVO
                    await Usuario.findByIdAndUpdate(usuarioId, { estado: 'activo' });

                    console.log(`✅ [Webhook] Pago exitoso ID: ${paymentId} vinculado y activado para usuario ${usuarioId}`);
                }
            } else {
                console.log(`⚠️ [Webhook] Pago ID: ${paymentId} estatus no aprobado: ${data.status}`);
            }
        }
        res.status(200).send("OK");
    } catch (error) {
        console.error("❌ Error en el Webhook de MP:", error.message);
        res.status(200).send("Processed");
    }
};
