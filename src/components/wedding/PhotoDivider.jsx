import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Paleta – teal:#3A9B9B  tealLight:#6ABFBF  sand:#F5ECD7  navy:#1A3A4A  gold:#C9A84C

const photos = [
  {
    url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80",
    caption: "Un amor que florece cada día",
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80",
    caption: "Juntos para siempre",
  },
  {
    url: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1200&q=80",
    caption: "El inicio de nuestra historia",
  },
];

export default function PhotoDivider({ index = 0 }) {
  const photo = photos[index % photos.length];
  const ref = useRef(null);

  // Scroll relativo al contenedor
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // cubre entrada Y salida del viewport
  });

  // Parallax: la imagen se mueve más lento que el scroll → efecto de profundidad
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Animaciones de ENTRADA (0→0.25) y SALIDA (0.75→1)
  const captionY  = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30,  0,  0, -30]);
  const captionOp = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0,  1,  1,   0]);

  // Overlay: se oscurece al entrar y al salir, más claro en el centro
  const overlayOp = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.75, 0.45, 0.35, 0.45, 0.75]);

  // Cortina de reveal: entra desde los lados y se abre al centro
  const curtainL  = useTransform(scrollYProgress, [0, 0.28], ["50%", "0%"]);
  const curtainR  = useTransform(scrollYProgress, [0, 0.28], ["50%", "0%"]);
  const curtainOp = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);

  // Líneas decorativas: se expanden al entrar, se contraen al salir
  const lineW  = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["0%", "100%", "100%", "0%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "clamp(220px, 55vw, 360px)" }} // mobile-first: más pequeño en mobile
    >

      {/* ── Imagen con parallax ── */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: imageY, scale: 1.18 }} // escala extra para que el parallax no deje huecos
      >
        <img
          src={photo.url}
          alt="Zabdi & Gerardo"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* ── Overlay animado ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOp,
          background: "linear-gradient(to bottom, rgba(26,58,74,1) 0%, rgba(26,58,74,0.7) 50%, rgba(26,58,74,1) 100%)",
        }}
      />

      {/* ── Shimmer turquesa lateral ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(58,155,155,0.12), transparent 40%, transparent 60%, rgba(58,155,155,0.12))" }}
      />

      {/* ── Cortinas de reveal (entran desde los extremos y se abren) ── */}
      <motion.div
        className="absolute top-0 bottom-0 left-0"
        style={{
          width: curtainL,
          opacity: curtainOp,
          background: "linear-gradient(to right, #FDF8EE, rgba(245,236,215,0.3))",
        }}
      />
      <motion.div
        className="absolute top-0 bottom-0 right-0"
        style={{
          width: curtainR,
          opacity: curtainOp,
          background: "linear-gradient(to left, #FDF8EE, rgba(245,236,215,0.3))",
        }}
      />

      {/* ── Caption con entrada y salida ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ y: captionY, opacity: captionOp }}
      >
        {/* Línea decorativa superior */}
        <div className="flex items-center gap-3 mb-3 w-full justify-center overflow-hidden">
          <motion.div
            style={{ width: lineW, maxWidth: 48 }}
            className="h-px flex-shrink-0"
            // inline, no transition prop needed — driven by scroll
          >
            <div className="h-full w-full" style={{ background: "#6ABFBF" }} />
          </motion.div>
          <span
            className="font-cormorant tracking-[0.25em] text-[10px] uppercase whitespace-nowrap flex-shrink-0"
            style={{ color: "#6ABFBF" }}
          >
            Zabdi &amp; Gerardo
          </span>
          <motion.div
            style={{ width: lineW, maxWidth: 48 }}
            className="h-px flex-shrink-0"
          >
            <div className="h-full w-full" style={{ background: "#6ABFBF" }} />
          </motion.div>
        </div>

        {/* Frase principal */}
        <p
          className="font-vibes text-center drop-shadow-lg leading-tight"
          style={{
            color: "#F5ECD7",
            fontSize: "clamp(1.8rem, 8vw, 3.5rem)", // mobile-first
          }}
        >
          {photo.caption}
        </p>

        {/* Ornamento inferior – pequeño diamante dorado */}
        <div className="flex items-center gap-2 mt-3">
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.6)" }} />
          <svg viewBox="0 0 10 10" className="w-2 h-2">
            <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="none" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.7"/>
          </svg>
          <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.6)" }} />
        </div>
      </motion.div>

      {/* ── Bordes de ola superior e inferior (transición suave con la sección) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-6 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #F5ECD7, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F5ECD7, transparent)" }}
      />
    </div>
  );
}