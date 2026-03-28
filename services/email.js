import axios from 'axios';

/**
 * Envía un email usando la API REST de Brevo
 * Usa HTTPS (puerto 443), sin problemas de SMTP
 */
export const enviarEmailBrevo = async (destinatario, asunto, htmlContent) => {
    const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
            sender: {
                name: 'Numerología ✨',
                email: process.env.EMAIL_USER
            },
            to: [{ email: destinatario }],
            subject: asunto,
            htmlContent
        },
        {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        }
    );
    return response;
};

/**
 * Genera el HTML del correo de bienvenida
 */
export const generarHtmlBienvenida = (nombre) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { margin: 0; padding: 0; background: #0a0b1e; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #12132a, #1a1b3d); border-radius: 16px; overflow: hidden; border: 1px solid rgba(219,192,101,0.3); }
    .header { background: linear-gradient(135deg, #dbc065, #b8962e); padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; color: #0a0b1e; font-size: 28px; letter-spacing: 2px; }
    .header p { margin: 8px 0 0; color: #1a1b3d; font-size: 14px; opacity: 0.85; }
    .body { padding: 40px 35px; }
    .greeting { color: #dbc065; font-size: 22px; font-weight: bold; margin-bottom: 16px; }
    .text { color: #c8c8e0; font-size: 15px; line-height: 1.7; margin-bottom: 20px; }
    .divider { border: none; border-top: 1px solid rgba(219,192,101,0.2); margin: 28px 0; }
    .cta { text-align: center; margin: 30px 0; }
    .cta a { background: linear-gradient(135deg, #dbc065, #b8962e); color: #0a0b1e; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px; letter-spacing: 1px; }
    .footer { background: rgba(0,0,0,0.3); padding: 20px 30px; text-align: center; color: rgba(200,200,224,0.5); font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✦ AETHERIC ORACLE ✦</h1>
      <p>Numerología Celestial</p>
    </div>
    <div class="body">
      <div class="greeting">Bienvenido/a, ${nombre} 🌟</div>
      <p class="text">
        Las estrellas te han estado esperando. Tu registro en <strong style="color:#dbc065">Aetheric Oracle</strong> ha sido completado con éxito. Ahora formas parte de una comunidad que descifra los mensajes del universo a través de los números.
      </p>
      <p class="text">
        Con tu cuenta activa, tendrás acceso a:
      </p>
      <ul class="text" style="padding-left:20px">
        <li>📖 Lecturas numéricas personalizadas</li>
        <li>🔮 Análisis predictivos celestiales</li>
        <li>⭐ Acceso al manuscrito del universo</li>
      </ul>
      <hr class="divider"/>
      <p class="text" style="text-align:center; font-size:13px; opacity:0.8;">
        Para desbloquear el acceso completo, adquiere tu suscripción y comienza tu viaje cósmico.
      </p>
      <div class="cta">
        <a href="https://prueba-iktfvtgml-natalia18803s-projects.vercel.app/#/planes">Ver Planes de Suscripción</a>
      </div>
    </div>
    <div class="footer">
      © 2024 Aetheric Oracle · Todos los derechos reservados<br/>
      Si no creaste esta cuenta, puedes ignorar este mensaje.
    </div>
  </div>
</body>
</html>
`;

/**
 * Genera el HTML del correo de recuperación de contraseña
 */
export const generarHtmlRecuperacion = (nombre, link) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { margin: 0; padding: 0; background: #0a0b1e; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #12132a, #1a1b3d); border-radius: 16px; overflow: hidden; border: 1px solid rgba(219,192,101,0.3); }
    .header { background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; color: #fff; font-size: 24px; letter-spacing: 2px; }
    .header p { margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; }
    .body { padding: 40px 35px; }
    .greeting { color: #dbc065; font-size: 20px; font-weight: bold; margin-bottom: 16px; }
    .text { color: #c8c8e0; font-size: 15px; line-height: 1.7; margin-bottom: 20px; }
    .divider { border: none; border-top: 1px solid rgba(219,192,101,0.2); margin: 28px 0; }
    .cta { text-align: center; margin: 30px 0; }
    .cta a { background: linear-gradient(135deg, #dbc065, #b8962e); color: #0a0b1e; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px; letter-spacing: 1px; }
    .warning { color: #e74c3c; font-size: 13px; text-align: center; margin-top: 16px; }
    .footer { background: rgba(0,0,0,0.3); padding: 20px 30px; text-align: center; color: rgba(200,200,224,0.5); font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔑 RECUPERACIÓN DE LLAVE</h1>
      <p>Aetheric Oracle</p>
    </div>
    <div class="body">
      <div class="greeting">Hola, ${nombre}</div>
      <p class="text">
        Hemos recibido una solicitud para restablecer tu <strong style="color:#dbc065">Llave Cósmica</strong> (contraseña). Si no fuiste tú quien la solicitó, puedes ignorar este mensaje.
      </p>
      <p class="text">
        Haz clic en el botón de abajo para crear una nueva contraseña:
      </p>
      <div class="cta">
        <a href="${link}">Restablecer Contraseña</a>
      </div>
      <p class="warning">⚠️ Este enlace expira en 15 minutos.</p>
      <hr class="divider"/>
      <p class="text" style="text-align:center; font-size:12px; opacity:0.6;">
        Si no solicitaste este cambio, tu cuenta está segura. No es necesario realizar ninguna acción.
      </p>
    </div>
    <div class="footer">
      © 2024 Aetheric Oracle · Todos los derechos reservados
    </div>
  </div>
</body>
</html>
`;
