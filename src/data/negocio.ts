// ── Fotos (src/assets) ──
import fotoHero from "../assets/medico.png";
// Pon aquí una foto de la clínica o del equipo; mientras tanto se reutiliza la del hero
import fotoSobre from "../assets/clinica.png";
import fotoMedicina from "../assets/medicina-general.webp";
import fotoFisio from "../assets/fisioterapia.webp";
import fotoNutricion from "../assets/nutricion.webp";
import fotoMedico from "../assets/medico2.jpg";
import fotoFisio2 from "../assets/fisio.jpg";
import fotoNutri from "../assets/nutricionista.jpg";

export const negocio = {
  nombre: "Clínica Vitalia",
  logo: "/logo.webp",

  navegacion: [
    { texto: "Sobre nosotros", href: "#sobre-nosotros" },
    { texto: "Especialidades", href: "#especialidades" },
    { texto: "Equipo", href: "#equipo" },
    { texto: "Reseñas", href: "#resenas" },
  ],

  cta: { texto: "Pedir cita", href: "#cita" },

  hero: {
    titulo: "Clínica médica en Valencia, sin listas de espera",
    subtitulo:
      "Medicina general, fisioterapia y nutrición. Te atendemos en menos de 24 horas y te acompañamos hasta que estés bien.",
    secundario: { texto: "Cómo trabajamos", href: "#como-trabajamos" },
    equipo: { texto: "Conoce a nuestro equipo", href: "#equipo" },
    imagen: fotoHero,
    alt: "Médico entregando un informe a un paciente en la consulta",
  },

  confianza: {
    titulo: "Por qué confiar en Clínica Vitalia",
    razones: [
      {
        icono: "tabler:shield-check",
        titulo: "Profesionales colegiados",
        texto: "Médicos y terapeutas con colegiación comprobada.",
      },
      {
        icono: "tabler:heart-handshake",
        titulo: "Trato cercano",
        texto: "Un mismo profesional te acompaña en todo el proceso.",
      },
      {
        icono: "tabler:lock",
        titulo: "Tus datos protegidos",
        texto: "Tu historial es privado y solo lo ve tu profesional.",
      },
    ],
  },

  sobreNosotros: {
    etiqueta: "Sobre nosotros",
    titulo: "Cuidando de Valencia desde [año]",
    texto:
      "[Historia de la clínica en 2 o 3 frases: quién la fundó, por qué y cómo ha crecido desde entonces.]",
    cifras: [
      { valor: "[15]", texto: "años de experiencia" },
      { valor: "[12.000]", texto: "pacientes atendidos" },
      { valor: "[8]", texto: "profesionales" },
    ],
    imagen: fotoSobre,
    alt: "Equipo de Clínica Vitalia en la clínica",
  },

  especialidades: {
    etiqueta: "Especialidades",
    titulo: "Todo lo que necesitas, en un mismo sitio",
    lista: [
      {
        titulo: "Medicina general",
        texto: "Revisiones, diagnósticos y seguimiento de tu salud.",
        motivos: ["Consulta sin prisas", "Analíticas en el día"],
        imagen: fotoMedicina,
        alt: "Consulta de medicina general de Clínica Vitalia",
      },
      {
        titulo: "Fisioterapia",
        texto: "Lesiones, dolor de espalda y recuperación.",
        motivos: ["Sesiones de 50 minutos", "Plan de ejercicios para casa"],
        imagen: fotoFisio,
        alt: "Sala de fisioterapia con camilla y espalderas",
      },
      {
        titulo: "Nutrición",
        texto: "Planes adaptados a ti, sin dietas imposibles.",
        motivos: ["Plan personalizado", "Revisión mensual"],
        imagen: fotoNutricion,
        alt: "Consulta de nutrición de Clínica Vitalia",
      },
    ],
  },

  equipo: {
    etiqueta: "Equipo",
    titulo: "Profesionales que te conocen por tu nombre",
    miembros: [
      {
        nombre: "Dr. [Nombre Apellido]",
        especialidad: "Medicina general",
        colegiado: "[nº colegiado]",
        experiencia: "[Años de experiencia, dónde se formó y en qué se ha especializado.]",
        metodo: "[Cómo trabaja con sus pacientes: qué hace en la primera consulta y cómo hace el seguimiento.]",
        imagen: fotoMedico,
      },
      {
        nombre: "[Nombre Apellido]",
        especialidad: "Fisioterapia",
        colegiado: "[nº colegiado]",
        experiencia: "[Años de experiencia, dónde se formó y en qué se ha especializado.]",
        metodo: "[Cómo trabaja con sus pacientes.]",
        imagen: fotoFisio2,
      },
      {
        nombre: "[Nombre Apellido]",
        especialidad: "Nutrición",
        colegiado: "[nº colegiado]",
        experiencia: "[Años de experiencia, dónde se formó y en qué se ha especializado.]",
        metodo: "[Cómo trabaja con sus pacientes.]",
        imagen: fotoNutri,
      },
    ],
  },

  // ── Reseñas ──
  // EJEMPLOS para la demo: sustitúyelas por 5 reseñas reales de la ficha de Google
  // (con el nombre tal como aparece allí) antes de publicar la web de un cliente.
  resenas: {
    etiqueta: "Reseñas",
    titulo: "Lo que dicen nuestros pacientes",
    valoracion: "4,9",
    total: "230",
    enlaceGoogle: "https://www.google.com/maps",
    lista: [
      {
        nombre: "Laura M.",
        especialidad: "Fisioterapia",
        fecha: "Octubre 2026",
        estrellas: 5,
        texto:
          "Llegué con un dolor de espalda que arrastraba desde hacía meses. En tres sesiones noté la diferencia y me dieron ejercicios para casa que sigo haciendo.",
      },
      {
        nombre: "Javier R.",
        especialidad: "Medicina general",
        fecha: "Septiembre 2026",
        estrellas: 5,
        texto:
          "Pedí cita por la mañana y me atendieron esa misma tarde. El médico me explicó todo con calma y sin prisas, algo que se agradece mucho.",
      },
      {
        nombre: "Marta G.",
        especialidad: "Nutrición",
        fecha: "Septiembre 2026",
        estrellas: 5,
        texto:
          "Por fin un plan de alimentación que puedo seguir. Nada de dietas imposibles: comida normal y revisiones cada mes para ir ajustando.",
      },
      {
        nombre: "Andrés P.",
        especialidad: "Fisioterapia",
        fecha: "Agosto 2026",
        estrellas: 5,
        texto:
          "Me recuperé de una lesión de rodilla antes de lo que esperaba. Profesionales muy cercanos y unas instalaciones impecables.",
      },
      {
        nombre: "Carmen L.",
        especialidad: "Medicina general",
        fecha: "Julio 2026",
        estrellas: 4,
        texto:
          "Trato muy cercano y resultados rápidos de las analíticas. Solo le pondría una pega: a veces cuesta aparcar cerca.",
      },
    ],
  },

  // ── Contacto (se usa en la sección de cita y, más adelante, en el footer) ──
  contacto: {
    telefono: "[960 000 000]",
    direccion: "[Calle Ejemplo 12, Valencia]",
    horario: "Lunes a viernes · 9:00–13:30 y 16:00–19:30",
  },

  cita: {
    etiqueta: "Pedir cita",
    titulo: "Reserva tu cita en menos de un minuto",
    texto:
      "Elige especialidad, día y hora. Te confirmamos al momento por correo, sin esperas ni llamadas.",
  },
};