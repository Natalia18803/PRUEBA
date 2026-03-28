import Lectura from '../models/lectura.js';
import Usuario from '../models/usuario.js';

// Función simulada para generar contenido de IA
const generarContenidoIA = (tipo, fecha_nacimiento) => {
  if (tipo === 'principal') {
    const dia = parseInt(fecha_nacimiento.getDate(), 10);
    const mes = parseInt(fecha_nacimiento.getMonth() + 1, 10);
    const numero = dia + mes;
    return `Tu número de vida es ${numero}. Este número representa tu camino espiritual y tus lecciones de vida.`;
  } else {
    const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `Lectura diaria para ${hoy}: Hoy es un día propicio para nuevas oportunidades. Mantén una actitud positiva y confía en el flujo del universo.`;
  }
};

// Respuesta estándar para invitar a Premium
const respuestaPremiumRequerido = (res) => res.status(403).json({
  error: 'Acceso Premium Requerido',
  mensaje: 'Has alcanzado el límite de lecturas gratuitas. Adquiere una suscripción para acceso ilimitado.',
  isPremiumRequired: true
});

export const getAllLecturas = async (req, res) => {
  try {
    const lecturas = await Lectura.find().sort({ fecha_lectura: -1 });
    res.json({ lecturas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /lecturas/principal/:usuario_id
 * FREE: Puede ver su Número Personal UNA sola vez (siempre gratuito).
 * PREMIUM: Puede regenerarlo cuantas veces quiera.
 */
export const generarLecturaPrincipal = async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;

    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPremium = await usuario.isMembershipActive();

    // Verificar si ya existe una lectura principal
    const lecturaExistente = await Lectura.findOne({ usuario_id, tipo: 'principal' });

    if (lecturaExistente) {
      if (!isPremium) {
        // Free: mostrar la lectura guardada (no generar nueva)
        return res.json({
          message: 'Tu Número Personal',
          lectura: lecturaExistente,
          esFree: true
        });
      }
      // Premium: eliminar y regenerar
      await Lectura.deleteOne({ _id: lecturaExistente._id });
    }

    const contenido = generarContenidoIA('principal', usuario.fecha_nacimiento);
    const lectura = new Lectura({ usuario_id, tipo: 'principal', contenido });
    await lectura.save();

    res.status(201).json({
      message: 'Lectura principal generada',
      lectura,
      esFree: !isPremium
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /lecturas/diaria/:usuario_id
 * FREE: Solo 1 lectura diaria. Si ya la hizo hoy, invitar a Premium.
 * PREMIUM: Acceso ilimitado (devuelve la del día si ya existe).
 */
export const generarLecturaDiaria = async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;

    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPremium = await usuario.isMembershipActive();

    // Rango del día actual
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const lecturaHoy = await Lectura.findOne({
      usuario_id,
      tipo: 'diaria',
      fecha_lectura: { $gte: hoy, $lt: manana }
    });

    if (lecturaHoy) {
      if (!isPremium) {
        // Free ya consumió su lectura diaria → bloquear con invitación a Premium
        return respuestaPremiumRequerido(res);
      }
      // Premium: devolver la del día (ya la tiene)
      return res.json({
        message: 'Tu lectura diaria de hoy',
        lectura: lecturaHoy
      });
    }

    const contenido = generarContenidoIA('diaria', usuario.fecha_nacimiento);
    const lectura = new Lectura({ usuario_id, tipo: 'diaria', contenido });
    await lectura.save();

    res.status(201).json({
      message: 'Lectura diaria generada',
      lectura,
      esFree: !isPremium
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLecturasByUsuario = async (req, res) => {
  try {
    const lecturas = await Lectura.find({ usuario_id: req.params.usuario_id }).sort({ fecha_lectura: -1 });
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLecturaById = async (req, res) => {
  try {
    const lectura = await Lectura.findById(req.params.id).populate('usuario_id', 'nombre email');
    if (!lectura) return res.status(404).json({ error: 'Lectura no encontrada' });
    res.json(lectura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
