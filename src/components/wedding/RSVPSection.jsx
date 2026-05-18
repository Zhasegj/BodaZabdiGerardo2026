import { useState } from "react";
import { motion } from "framer-motion";
import { createRSVP } from "@/services/rsvpService";

// Paleta – sandLight:#FDF8EE  teal:#3A9B9B  navy:#1A3A4A  gold:#C9A84C  blush:#E8896A  sage:#5A7A68

export default function RSVPSection() {
  const [form, setForm] = useState({ nombre: "", email: "", asistencia: "", acompanantes: 0, mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "acompanantes" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.asistencia) { setError("Por favor completa los campos obligatorios."); return; }
    setError("");
    setLoading(true);
    try {
      await createRSVP(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error al enviar RSVP");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid rgba(58,155,155,0.45)",
    padding: "12px 16px",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    outline: "none",
    background: "rgba(245,236,215,0.5)",
    color: "#1A3A4A",
    transition: "border-color 0.2s",
  };

  if (success) {
    return (
      <section id="rsvp" className="py-16 px-4" style={{ background: "#FDF8EE" }}>
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="font-vibes text-5xl mb-3"
            style={{ color: "#3A9B9B" }}
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ¡Gracias!
          </motion.p>
          <h2 className="font-playfair text-2xl font-bold mb-3" style={{ color: "#1A3A4A" }}>{form.nombre}</h2>
          <div className="w-16 h-px mx-auto mb-4" style={{ background: "rgba(58,155,155,0.5)" }} />
          <p className="font-cormorant italic text-lg" style={{ color: "#5A7A68" }}>
            {form.asistencia === "Asistiré con gusto"
              ? "¡Nos alegra mucho que puedas acompañarnos! Te esperamos el 29 de agosto. 🎉"
              : "Lamentamos que no puedas asistir, pero agradecemos que nos lo hagas saber. ❤️"}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 px-4" style={{ background: "#FDF8EE" }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="font-vibes text-3xl mb-1" style={{ color: "#3A9B9B" }}>Confirmación</p>
          <h2 className="font-playfair text-4xl font-bold" style={{ color: "#1A3A4A" }}>RSVP</h2>
          <div className="flex items-center justify-center gap-3 mt-4 mb-3">
            <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.5)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "rgba(201,168,76,0.5)" }} />
            <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.5)" }} />
          </div>
          <p className="font-cormorant italic text-base" style={{ color: "#5A7A68" }}>
            Por favor confirma tu asistencia antes del <strong>1 de agosto de 2026</strong>.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="p-8 bg-white relative"
          style={{ border: "1px solid rgba(58,155,155,0.25)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: "2px solid #3A9B9B", borderLeft: "2px solid #3A9B9B" }} />
          <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop: "2px solid #3A9B9B", borderRight: "2px solid #3A9B9B" }} />
          <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "2px solid #3A9B9B", borderLeft: "2px solid #3A9B9B" }} />
          <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "2px solid #3A9B9B", borderRight: "2px solid #3A9B9B" }} />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-xs font-cormorant font-semibold mb-1 tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                Nombre completo *
              </label>
              <input
                type="text" name="nombre" value={form.nombre} onChange={handleChange}
                placeholder="Tu nombre completo"
                className="font-cormorant"
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-cormorant font-semibold mb-1 tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                Correo electrónico
              </label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="tu@correo.com"
                className="font-cormorant"
                style={inputStyle}
              />
            </div>

            {/* Asistencia */}
            <div>
              <label className="block text-xs font-cormorant font-semibold mb-2 tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                ¿Asistirás? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Asistiré con gusto", "No podré asistir"].map((opcion) => {
                  const selected = form.asistencia === opcion;
                  return (
                    <motion.button
                      key={opcion}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, asistencia: opcion }))}
                      className="py-2.5 px-3 text-xs font-cormorant tracking-wide uppercase transition-all"
                      style={{
                        border: `1px solid ${selected ? "#C9A84C" : "rgba(201,168,76,0.4)"}`,
                        background: selected ? "#C9A84C" : "white",
                        color: selected ? "white" : "#786045",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {opcion === "Asistiré con gusto" ? "✓ " + opcion : "✗ " + opcion}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Acompañantes */}
            {form.asistencia === "Asistiré con gusto" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
                <label className="block text-xs font-cormorant font-semibold mb-1 tracking-widest uppercase" style={{ color: "#E8896A" }}>
                  Acompañantes
                </label>
                <select name="acompanantes" value={form.acompanantes} onChange={handleChange} className="font-cormorant" style={inputStyle}>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n === 0 ? "Solo yo" : `+${n} acompañante${n > 1 ? "s" : ""}`}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Mensaje */}
            <div>
              <label className="block text-xs font-cormorant font-semibold mb-1 tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                Mensaje para los novios
              </label>
              <textarea
                name="mensaje" value={form.mensaje} onChange={handleChange} rows={3}
                placeholder="Escríbeles algo especial..."
                className="font-cormorant resize-none"
                style={inputStyle}
              />
            </div>

            {error && <p className="text-xs text-center font-cormorant" style={{ color: "#E8896A" }}>{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-xs font-cormorant tracking-[0.2em] uppercase transition-all disabled:opacity-70"
              style={{ background: "#E8896A", color: "white" }}
              whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Enviando..." : "Confirmar Asistencia"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}