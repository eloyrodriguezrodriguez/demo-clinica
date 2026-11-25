import fotoHero from "../assets/medico.png";
import fotoSobre from "../assets/clinica.jpg";

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
        icono: "tabler:calendar",
        titulo: "Cita sin esperas",
        texto: "Te atendemos en menos de 24 horas.",
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
    alt: "Equipo de Clínica Vitalia en la recepción de la clínica",
  },
};
