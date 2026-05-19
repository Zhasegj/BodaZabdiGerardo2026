import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Paleta – teal:#3A9B9B  tealLight:#6ABFBF  sand:#F5ECD7  navy:#1A3A4A  gold:#C9A84C

const photos = [
  {
    url: "/pictures/imgmeta.jpg",
    caption: "Un amor que florece cada día",
  },
  {
    url: "/pictures/img2.jpg",
    caption: "Juntos para siempre",
  },
  {
    url: "/pictures/img3.jpg",
    caption: "El inicio de nuestra historia",
  },
];

export default function PhotoDivider({ index = 0 }) {
  const photo = photos[index % photos.length];
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Caption: entra y sale suavemente
  const captionOp = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const captionY  = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [20, 0, 0, -20]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        // Mobile: cuadrado 1:1 — Desktop: un poco más alto
        aspectRatio: "1 / 1",
        maxHeight: "min(100vw, 600px)",
      }}
    >
      {/* ── Imagen fija: background-attachment:fixed hace el efecto "locked" ──
          La imagen queda anclada al viewport y el contenido pasa por encima.
          En iOS (que no soporta fixed en elementos hijos) usamos un fallback
          con object-position center para que al menos se vea bien. */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${photo.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // El truco: fixed hace que la imagen quede anclada al viewport
          backgroundAttachment: "fixed",
          // Fallback para iOS Safari que no soporta fixed correctamente
          // Se sobreescribe con @supports si el dispositivo lo soporta
        }}
      />

      {/* ── Overlay con degradado en top y bottom ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(26,58,74,0.6) 0%, transparent 35%, transparent 65%, rgba(26,58,74,0.6) 100%)",
        }}
      />

      {/* ── Caption centrado con animación de scroll ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: captionOp, y: captionY }}
      >
        {/* Líneas laterales */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-10" style={{ background: "rgba(106,191,191,0.8)" }} />
          <span
            className="font-cormorant text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
            style={{ color: "#6ABFBF" }}
          >
            Zabdi &amp; Gerardo
          </span>
          <div className="h-px w-10" style={{ background: "rgba(106,191,191,0.8)" }} />
        </div>

        {/* Frase */}
        <p
          className="font-vibes text-center drop-shadow-lg leading-tight"
          style={{
            color: "#FDF8EE",
            fontSize: "clamp(2rem, 9vw, 3.8rem)",
            textShadow: "0 2px 12px rgba(26,58,74,0.5)",
          }}
        >
          {photo.caption}
        </p>

        {/* Diamante dorado */}
        <div className="flex items-center gap-2 mt-3">
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.7)" }} />
          <svg viewBox="0 0 10 10" className="w-2 h-2">
            <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)"
              fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.8"/>
          </svg>
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.7)" }} />
        </div>
      </motion.div>
    </div>
  );
}