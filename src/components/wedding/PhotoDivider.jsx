import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

// Paleta – teal:#3A9B9B  tealLight:#6ABFBF  sand:#F5ECD7  navy:#1A3A4A  gold:#C9A84C

// Técnica: el contenedor tiene height grande (el "scroll space").
// La imagen dentro es sticky al viewport y su Y se mueve MUY poco
// con useTransform → el resultado visual es que "no se mueve" mientras
// el contenido de arriba/abajo pasa por encima. Funciona en iOS + Android + desktop.

const photos = [
  {
    url: "/pictures/img1.jpeg",
    caption: "Un amor que florece cada día",
  },
  {
    url: "/pictures/img21.jpg",
    caption: "Juntos para siempre",
  },
  {
    url: "/pictures/img32.jpg",
    caption: "El inicio de nuestra historia",
  },
];

export default function PhotoDivider({ index = 0, ratio = "1 / 1" }) {
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

  // Blur: 0 en los extremos → máximo (4px) en el centro
  const blurVal     = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, 0, 4, 0, 0]);
  const backdropStr = useMotionTemplate`blur(${blurVal}px)`;

  // Opacidad del fondo de la cápsula: más transparente en extremos, sólido en centro
  const bgOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, 0, 0.52, 0, 0]);

  return (
    // Contenedor con aspect-ratio cuadrado — igual en todos los dispositivos
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      style={{ aspectRatio: ratio, maxHeight: "min(100vw, 600px)" }}
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
          className="w-full h-full object-cover scale-[1.3]"
          loading={index === 0 ? "eager" : "lazy"}
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
        {/* Cápsula oscura — blur y fondo crecen hasta el centro y decrecen al salir */}
        <motion.div
          className="flex flex-col items-center px-6 py-4 rounded-sm"
          style={{
            background: useMotionTemplate`rgba(26,58,74,${bgOpacity})`,
            backdropFilter: backdropStr,
            WebkitBackdropFilter: backdropStr,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex items-center gap-3 mb-2.5">
            <div className="h-px w-8" style={{ background: "rgba(106,191,191,0.9)" }} />
            <span
              className="font-cormorant text-[11px] tracking-[0.28em] uppercase whitespace-nowrap font-semibold"
              style={{ color: "#6ABFBF" }}
            >
              Zabdi &amp; Gerardo
            </span>
            <div className="h-px w-8" style={{ background: "rgba(106,191,191,0.9)" }} />
          </div>

          <p
            className="font-vibes text-center leading-tight"
            style={{
              color: "#FDF8EE",
              fontSize: "clamp(2rem, 9vw, 3.8rem)",
            }}
          >
            {photo.caption}
          </p>

          <div className="flex items-center gap-2 mt-2.5">
            <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.8)" }} />
            <svg viewBox="0 0 10 10" className="w-2 h-2">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)"
                fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.9"/>
            </svg>
            <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.8)" }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}