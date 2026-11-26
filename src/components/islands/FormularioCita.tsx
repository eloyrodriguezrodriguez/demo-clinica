// ── Formulario de cita (isla de React) ──
// Tiene estado: especialidad, día, horas libres, datos del paciente y resultado del envío.
// Por eso es React; el resto de la sección es Astro.

import { useEffect, useState, type FormEvent } from "react";
import { configCitas } from "../../data/citas";

type Estado = "rellenando" | "enviando" | "confirmada";

// Fecha local del navegador en formato "AAAA-MM-DD"
const hoy = () => new Date().toLocaleDateString("sv-SE");
const sumarDias = (fecha: string, dias: number) => {
  const d = new Date(`${fecha}T12:00:00`);
  d.setDate(d.getDate() + dias);
  return d.toLocaleDateString("sv-SE");
};

export default function FormularioCita() {
  const [especialidad, setEspecialidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [horas, setHoras] = useState<string[]>([]);
  const [hora, setHora] = useState("");
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const [avisoHoras, setAvisoHoras] = useState("");

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [web, setWeb] = useState(""); // campo trampa para bots

  const [estado, setEstado] = useState<Estado>("rellenando");
  const [error, setError] = useState("");

  // Cada vez que cambian la especialidad o el día, pedimos las horas libres
  const cargarHoras = async (señal?: AbortSignal) => {
    if (!especialidad || !fecha) return;
    setCargandoHoras(true);
    setAvisoHoras("");
    setHora("");
    try {
      const parametros = new URLSearchParams({ especialidad, fecha });
      const respuesta = await fetch(`/api/disponibilidad?${parametros}`, { signal: señal });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        setHoras([]);
        setAvisoHoras(datos.error);
      } else {
        setHoras(datos.horas);
        if (datos.horas.length === 0) setAvisoHoras("No quedan horas libres ese día. Prueba con otro.");
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setAvisoHoras("No hemos podido cargar las horas. Inténtalo de nuevo.");
    } finally {
      setCargandoHoras(false);
    }
  };

  useEffect(() => {
    const control = new AbortController();
    cargarHoras(control.signal);
    return () => control.abort();
  }, [especialidad, fecha]);

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    setError("");

    if (!especialidad || !fecha || !hora) {
      setError("Elige especialidad, día y hora.");
      return;
    }

    setEstado("enviando");
    try {
      const respuesta = await fetch("/api/citas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ especialidad, fecha, hora, nombre, email, telefono, consentimiento, web }),
      });
      const datos = await respuesta.json();

      if (respuesta.ok) {
        setEstado("confirmada");
        return;
      }

      setError(datos.error);
      setEstado("rellenando");
      // Si otra persona ha reservado esa hora justo antes, actualizamos las horas libres
      if (respuesta.status === 409) cargarHoras();
    } catch {
      setError("No hemos podido enviar tu cita. Revisa tu conexión e inténtalo de nuevo.");
      setEstado("rellenando");
    }
  };

  // ── Pantalla de confirmación ──
  if (estado === "confirmada") {
    const dia = new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return (
      <div className="formulario-confirmacion" role="status">
        <p className="formulario-confirmacion-titulo">¡Cita confirmada!</p>
        <p>
          {especialidad} · {dia} a las {hora}
        </p>
        <p className="formulario-ayuda">Te hemos enviado un correo a {email} con los detalles.</p>
      </div>
    );
  }

  // ── Formulario ──
  return (
    <form className="formulario" onSubmit={enviar} noValidate={false}>
      {/* 1. Especialidad */}
      <fieldset className="formulario-paso">
        <legend className="formulario-leyenda">1. Especialidad</legend>
        <div className="opciones">
          {configCitas.especialidades.map((nombreEsp) => (
            <label key={nombreEsp} className="opcion">
              <input
                type="radio"
                name="especialidad"
                value={nombreEsp}
                checked={especialidad === nombreEsp}
                onChange={() => setEspecialidad(nombreEsp)}
                required
              />
              <span>{nombreEsp}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 2. Día */}
      <fieldset className="formulario-paso">
        <legend className="formulario-leyenda">2. Día</legend>
        <label className="campo">
          <span className="campo-etiqueta">Elige un día de lunes a viernes</span>
          <input
            type="date"
            className="campo-control"
            value={fecha}
            min={hoy()}
            max={sumarDias(hoy(), configCitas.diasAntelacionMax)}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
      </fieldset>

      {/* 3. Hora */}
      <fieldset className="formulario-paso">
        <legend className="formulario-leyenda">3. Hora</legend>
        {!especialidad || !fecha ? (
          <p className="formulario-ayuda">Elige especialidad y día para ver las horas libres.</p>
        ) : cargandoHoras ? (
          <p className="formulario-ayuda">Buscando horas libres…</p>
        ) : avisoHoras ? (
          <p className="formulario-ayuda">{avisoHoras}</p>
        ) : (
          <div className="opciones opciones-horas">
            {horas.map((h) => (
              <label key={h} className="opcion">
                <input
                  type="radio"
                  name="hora"
                  value={h}
                  checked={hora === h}
                  onChange={() => setHora(h)}
                  required
                />
                <span>{h}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {/* 4. Datos */}
      <fieldset className="formulario-paso">
        <legend className="formulario-leyenda">4. Tus datos</legend>
        <div className="campos">
          <label className="campo">
            <span className="campo-etiqueta">Nombre y apellidos</span>
            <input
              type="text"
              className="campo-control"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={2}
              maxLength={80}
            />
          </label>
          <label className="campo">
            <span className="campo-etiqueta">Correo electrónico</span>
            <input
              type="email"
              className="campo-control"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="campo">
            <span className="campo-etiqueta">Teléfono</span>
            <input
              type="tel"
              className="campo-control"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Campo trampa: invisible para las personas */}
        <div className="campo-trampa" aria-hidden="true">
          <label>
            No rellenes este campo
            <input type="text" tabIndex={-1} autoComplete="off" value={web} onChange={(e) => setWeb(e.target.value)} />
          </label>
        </div>

        <label className="consentimiento">
          <input
            type="checkbox"
            checked={consentimiento}
            onChange={(e) => setConsentimiento(e.target.checked)}
            required
          />
          <span>
            Acepto que {configCitas.nombreClinica} use mis datos para gestionar mi cita, según la{" "}
            <a href="/privacidad" className="enlace">
              política de privacidad
            </a>
            .
          </span>
        </label>
      </fieldset>

      {error && (
        <p className="formulario-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="boton boton-principal formulario-boton" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Reservando…" : "Confirmar cita"}
      </button>
    </form>
  );
}