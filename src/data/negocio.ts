// ── Fotos (src/assets) ──
import fotoHero from "../assets/medico.png";
// Pon aquí una foto de la clínica o del equipo; mientras tanto se reutiliza la del hero
import fotoSobre from "../assets/clinica.png";
import fotoMedicina from "../assets/medicina-general.webp";
import fotoFisio from "../assets/fisioterapia.webp";
import fotoNutricion from "../assets/nutricion.webp";

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
};