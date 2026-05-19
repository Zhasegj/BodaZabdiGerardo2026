import { motion } from "framer-motion";

// Paleta – sand:#F5ECD7  sandLight:#FDF8EE  teal:#3A9B9B  navy:#1A3A4A  gold:#C9A84C  blush:#E8896A  sage:#5A7A68

// Sobre SVG animado
function EnvelopeSVG() {
  return (
    <motion.svg
      viewBox="0 0 120 80"
      className="w-28 h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 6 }}
      animate={{ y: -6 }}
      transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      {/* Sombra suave */}
      <ellipse cx="60" cy="76" rx="38" ry="4" fill="rgba(26,58,74,0.08)" />

      {/* Cuerpo del sobre */}
      <rect x="8" y="22" width="104" height="52" rx="3" fill="#FDF8EE" stroke="#C9A84C" strokeWidth="1.2"/>

      {/* Solapa trasera cerrada */}
      <path d="M8 25 L60 52 L112 25" fill="#F5ECD7" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round"/>

      {/* Solapa delantera abierta — levantada */}
      <motion.path
        d="M8 22 L60 2 L112 22"
        fill="#FDF8EE"
        stroke="#C9A84C"
        strokeWidth="1.2"
        strokeLinejoin="round"
        initial={{ d: "M8 22 L60 2 L112 22" }}
        animate={{ d: "M8 22 L60 8 L112 22" }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Sello de cera dorado */}
      <circle cx="60" cy="44" r="10" fill="url(#sealGrad)" />
      <circle cx="60" cy="44" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
      <text
        x="60" y="48"
        textAnchor="middle"
        fontSize="7"
        fontFamily="serif"
        fontWeight="bold"
        fill="#FDF8EE"
        style={{ userSelect: "none" }}
      >Z&amp;G</text>

      {/* Billete asomándose */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: -4 }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <rect x="38" y="10" width="44" height="26" rx="2" fill="#A8D5A2" stroke="rgba(90,122,104,0.4)" strokeWidth="0.8"/>
        <rect x="41" y="13" width="38" height="20" rx="1" fill="none" stroke="rgba(90,122,104,0.25)" strokeWidth="0.5"/>
        <circle cx="60" cy="23" r="5" fill="none" stroke="rgba(90,122,104,0.35)" strokeWidth="0.6"/>
        <line x1="44" y1="23" x2="52" y2="23" stroke="rgba(90,122,104,0.3)" strokeWidth="0.5"/>
        <line x1="68" y1="23" x2="76" y2="23" stroke="rgba(90,122,104,0.3)" strokeWidth="0.5"/>
      </motion.g>

      <defs>
        <radialGradient id="sealGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#E8C96A"/>
          <stop offset="60%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8A6E2F"/>
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

export default function GiftSection() {
  return (
    <section className="py-16 px-4 relative overflow-hidden" style={{ background: "#F5ECD7" }}>

      {/* Textura de puntos muy sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(#1A3A4A 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="max-w-lg mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="font-vibes text-3xl mb-1" style={{ color: "#E8896A" }}>Con todo nuestro amor</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold leading-snug" style={{ color: "#1A3A4A" }}>
            ¡Tu presencia ya es<br/>el mejor regalo!
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-14" style={{ background: "rgba(201,168,76,0.45)" }} />
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
              <circle cx="10" cy="10" r="3" stroke="#C9A84C" strokeWidth="1.2"/>
              <circle cx="10" cy="10" r="6.5" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
            </svg>
            <div className="h-px w-14" style={{ background: "rgba(201,168,76,0.45)" }} />
          </div>
        </motion.div>

        {/* Tarjeta principal */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: "#FDFAF5",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 4px 32px rgba(26,58,74,0.07)",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {/* Franja superior dorada */}
          <div className="h-1 w-full" style={{
            background: "linear-gradient(to right, transparent, #C9A84C, #E8896A, #C9A84C, transparent)"
          }} />

          {/* Corner accents */}
          <div className="absolute top-1 left-0 w-5 h-5" style={{ borderTop: "1.5px solid rgba(201,168,76,0.4)", borderLeft: "1.5px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute top-1 right-0 w-5 h-5" style={{ borderTop: "1.5px solid rgba(201,168,76,0.4)", borderRight: "1.5px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "1.5px solid rgba(201,168,76,0.4)", borderLeft: "1.5px solid rgba(201,168,76,0.4)" }} />
          <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "1.5px solid rgba(201,168,76,0.4)", borderRight: "1.5px solid rgba(201,168,76,0.4)" }} />

          <div className="px-7 py-8 flex flex-col items-center text-center gap-6">

            {/* Sobre animado */}
            <EnvelopeSVG />

            {/* Texto */}
            <div>
              <p className="font-cormorant text-lg leading-relaxed" style={{ color: "#1A3A4A" }}>
                Pero, para quienes insisten...
              </p>
              <p className="font-cormorant italic text-base mt-2 leading-relaxed" style={{ color: "#5A7A68" }}>
                Hemos preparado <span style={{ color: "#C9A84C", fontStyle: "normal", fontWeight: 600 }}>sobres para efectivo</span> el día de la boda. 🌊
                <br/>
              </p>
            </div>

            {/* Separador */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(58,155,155,0.3))" }} />
              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
                <path d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.5 5 11 6 12 7.5C13 6 14.5 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z"
                  fill="#E8896A" fillOpacity="0.7"/>
              </svg>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(58,155,155,0.3))" }} />
            </div>

            {/* Nota final */}
            <p
              className="font-vibes text-2xl"
              style={{ color: "#3A9B9B" }}
            >
              Su amor y compañía es todo para nosotros
            </p>
          </div>

          {/* Franja inferior */}
          <div className="h-1 w-full" style={{
            background: "linear-gradient(to right, transparent, #3A9B9B, #6ABFBF, #3A9B9B, transparent)"
          }} />
        </motion.div>

      </div>
    </section>
  );
}