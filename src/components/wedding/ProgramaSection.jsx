import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Paleta – sand:#F5ECD7  teal:#3A9B9B  tealLight:#6ABFBF  navy:#1A3A4A  gold:#C9A84C  blush:#E8896A  sage:#5A7A68

const MAPS_URL = "https://maps.app.goo.gl/FqAhRQBQcUz5SamVA?g_st=ic";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.431180151508!2d-89.8187008!3d21.254393300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f55e5fe2e82f7b7%3A0xa7df70622f90a391!2sArtist%20Beach%20House%20Sunset%20Haven!5e0!3m2!1sen!2smx!4v1779165217128!5m2!1sen!2smx";
const LUGAR = "Chuburna Puerto, Yucatán";

// Iconos SVG personalizados — más elegantes que emojis
function IconReception() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <circle cx="16" cy="9" r="4" stroke="#C9A84C" strokeWidth="1.4"/>
      <path d="M7 28c0-5 4-9 9-9s9 4 9 9" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11 21h10" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.45"/>
    </svg>
  );
}

function IconRings() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <circle cx="11.5" cy="16" r="5.5" stroke="#C9A84C" strokeWidth="1.5"/>
      <circle cx="20.5" cy="16" r="5.5" stroke="#C9A84C" strokeWidth="1.5"/>
      <path d="M15.5 12.8c.8-1 1.9-1.8 3.5-1.8" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55"/>
    </svg>
  );
}

function IconBrunch() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <path d="M16 5v4" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10 7.5l2.5 3.5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M22 7.5l-2.5 3.5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M6 14q10 8 20 0" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M9 27h14" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M16 22v5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

const eventos = [
  {
    dia: "Sábado · 29 de Agosto",
    items: [
      {
        hora: "1:30 pm",
        titulo: "Recepción Social",
        Icon: IconReception,
        descripcion: "Bienvenida y aperitivos",
        dressCode: "Vestimenta formal",
      },
      {
        hora: "2:00 pm",
        titulo: "Ceremonia Civil",
        Icon: IconRings,
        descripcion: "Intercambio de votos",
        dressCode: "Cocktail Attire",
        showMap: true,
      },
    ],
  },
  {
    dia: "Domingo · 30 de Agosto",
    items: [
      {
        hora: "9:00 am",
        titulo: "Brunch de despedida",
        Icon: IconBrunch,
        descripcion: "Desayuno y despedida en la playa",
        dressCode: "Ropa de playa",
      },
    ],
  },
];

function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      className="flex gap-5 relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      {/* Columna izquierda: nodo + línea */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        <div
          className="flex items-center justify-center rounded-full z-10"
          style={{
            width: 40, height: 40,
            background: "white",
            border: "1.5px solid #C9A84C",
            boxShadow: "0 2px 12px rgba(201,168,76,0.2)",
          }}
        >
          <item.Icon />
        </div>
        {!isLast && (
          <div className="flex-1 mt-1" style={{
            width: 1,
            background: "linear-gradient(to bottom, rgba(201,168,76,0.35), rgba(58,155,155,0.18))",
            minHeight: 32,
          }} />
        )}
      </div>

      {/* Contenido */}
      <div className="pb-8 flex-1 min-w-0">
        {/* Hora pill */}
        <div
          className="inline-flex items-center mb-2.5 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(58,155,155,0.1)", border: "1px solid rgba(58,155,155,0.2)" }}
        >
          <span className="font-cormorant text-xs font-semibold tracking-widest uppercase" style={{ color: "#3A9B9B" }}>
            {item.hora}
          </span>
        </div>

        {/* Card */}
        <motion.div
          className="overflow-hidden"
          style={{
            background: "#FDFAF5",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 4px 32px rgba(26,58,74,0.07)",
          }}
          whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(58,155,155,0.12)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Franja superior dorada */}
          <div className="h-0.5 w-full" style={{
            background: "linear-gradient(to right, transparent, #C9A84C, #E8896A, #C9A84C, transparent)"
          }} />

          {/* Corner accents – turquesa */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: "1.5px solid rgba(58,155,155,0.5)", borderLeft: "1.5px solid rgba(58,155,155,0.5)" }} />
            <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop: "1.5px solid rgba(58,155,155,0.5)", borderRight: "1.5px solid rgba(58,155,155,0.5)" }} />
            <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "1.5px solid rgba(58,155,155,0.5)", borderLeft: "1.5px solid rgba(58,155,155,0.5)" }} />
            <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "1.5px solid rgba(58,155,155,0.5)", borderRight: "1.5px solid rgba(58,155,155,0.5)" }} />

          <div className="p-5">
            <h3 className="font-playfair text-lg font-bold mb-1" style={{ color: "#1A3A4A" }}>
              {item.titulo}
            </h3>
            <p className="font-cormorant italic text-sm mb-3.5" style={{ color: "#5A7A68" }}>
              {item.descripcion}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              {/* Dress code */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-px" style={{ background: "#C9A84C" }} />
                <span className="font-cormorant text-xs tracking-wider uppercase" style={{ color: "#C9A84C" }}>
                  {item.dressCode}
                </span>
              </div>
              {/* Lugar */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-cormorant text-xs transition-colors"
                style={{ color: "#5A7A68" }}
                onMouseEnter={e => e.currentTarget.style.color = "#E8896A"}
                onMouseLeave={e => e.currentTarget.style.color = "#5A7A68"}
              >
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>{LUGAR}</span>
              </a>
            </div>
          </div>

          {/* Mapa embebido */}
          {item.showMap && (
            <>
              <div style={{ borderTop: "1px solid rgba(58,155,155,0.15)" }}>
                <iframe
                  title="Mapa del evento"
                  width="100%"
                  height="160"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  allowFullScreen
                  src={MAPS_EMBED}
                />
              </div>
              <div
                className="flex justify-end px-4 py-2.5"
                style={{ borderTop: "1px solid rgba(58,155,155,0.12)" }}
              >
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cormorant text-xs tracking-widest uppercase transition-all px-4 py-1.5"
                  style={{ border: "1px solid #E8896A", color: "#E8896A" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#E8896A"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E8896A"; }}
                >
                  Cómo llegar →
                </a>
              </div>
            </>
          )}
          </div>{/* cierra .relative de corner accents */}

          {/* Franja inferior turquesa */}
          <div className="h-0.5 w-full" style={{
            background: "linear-gradient(to right, transparent, #3A9B9B, #6ABFBF, #3A9B9B, transparent)"
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function DayGroup({ grupo, groupIndex }) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Etiqueta del día */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#3A9B9B" }} />
        <span
          className="font-cormorant font-semibold text-sm uppercase tracking-[0.22em] whitespace-nowrap"
          style={{ color: "#3A9B9B" }}
        >
          {grupo.dia}
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(58,155,155,0.3), transparent)" }} />
      </div>

      {/* Items */}
      <div className="pl-1">
        {grupo.items.map((item, i) => (
          <TimelineItem
            key={i}
            item={item}
            index={i}
            isLast={i === grupo.items.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProgramaSection() {
  return (
    <section id="programa" className="py-16 px-4" style={{ background: "#F5ECD7" }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="font-vibes text-3xl mb-1" style={{ color: "#3A9B9B" }}>El gran día</p>
          <h2 className="font-playfair text-4xl font-bold" style={{ color: "#1A3A4A" }}>Programa</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.45)" }} />
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
              <circle cx="10" cy="10" r="3" stroke="#C9A84C" strokeWidth="1.2"/>
              <circle cx="10" cy="10" r="6.5" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
            </svg>
            <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.45)" }} />
          </div>
          <p className="font-cormorant italic text-sm mt-4" style={{ color: "#5A7A68" }}>
            Chuburna Puerto · Yucatán, México
          </p>
        </motion.div>

        {/* Timeline */}
        {eventos.map((grupo, i) => (
          <DayGroup key={grupo.dia} grupo={grupo} groupIndex={i} />
        ))}

      </div>
    </section>
  );
}