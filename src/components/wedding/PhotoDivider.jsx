import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Paleta – teal:#3A9B9B  tealLight:#6ABFBF  sand:#F5ECD7  navy:#1A3A4A  gold:#C9A84C

// Técnica: el contenedor tiene height grande (el "scroll space").
// La imagen dentro es sticky al viewport y su Y se mueve MUY poco
// con useTransform → el resultado visual es que "no se mueve" mientras
// el contenido de arriba/abajo pasa por encima. Funciona en iOS + Android + desktop.

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
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // La imagen se mueve MUY poco (±6%) mientras el scroll avanza 100%
  // → efecto "locked": parece que no se mueve mientras todo lo demás sí
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Caption entra y sale
  const captionOp = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const captionY  = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [16, 0, 0, -16]);

  return (
    // Contenedor con aspect-ratio cuadrado — igual en todos los dispositivos
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      style={{ aspectRatio: "1 / 1", maxHeight: "min(100vw, 600px)" }}
    >
      {/* Imagen con parallax JS — funciona en iOS, Android y desktop */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          y: imageY,
          // Escala ligeramente mayor para que el movimiento no deje huecos
          scale: 1.14,
        }}
      >
        <img
          src={photo.url}
          alt="Zabdi & Gerardo"
          className="w-full h-full object-cover"
          loading="lazy"
          // Deshabilitar arrastre en móvil
          draggable={false}
          style={{ userSelect: "none", WebkitUserDrag: "none" }}
        />
      </motion.div>

      {/* Overlay: degradado simétrico top + bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(26,58,74,0.6) 0%, transparent 35%, transparent 65%, rgba(26,58,74,0.6) 100%)",
        }}
      />

      {/* Caption */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: captionOp, y: captionY }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-10" style={{ background: "rgba(106,191,191,0.85)" }} />
          <span className="font-cormorant text-[10px] tracking-[0.28em] uppercase whitespace-nowrap" style={{ color: "#6ABFBF" }}>
            Zabdi &amp; Gerardo
          </span>
          <div className="h-px w-10" style={{ background: "rgba(106,191,191,0.85)" }} />
        </div>

        <p
          className="font-vibes text-center leading-tight"
          style={{
            color: "#FDF8EE",
            fontSize: "clamp(2rem, 9vw, 3.8rem)",
            textShadow: "0 2px 16px rgba(26,58,74,0.6)",
          }}
        >
          {photo.caption}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.75)" }} />
          <svg viewBox="0 0 10 10" className="w-2 h-2">
            <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)"
              fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.85"/>
          </svg>
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.75)" }} />
        </div>
      </motion.div>
    </div>
  );
}