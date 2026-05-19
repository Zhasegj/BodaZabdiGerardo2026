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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax suave en la imagen
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Entrada y salida del bloque completo
  const blockOp = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const blockY  = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [32, 0, 0, -20]);

  // Caption: aparece un poco después que la imagen
  const captionOp = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const captionY  = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [12, 0, 0, -8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: blockOp, y: blockY, willChange: "opacity, transform" }}
      className="w-full"
    >
      {/* ── Contenedor estilo post social – centrado, max-width mobile ── */}
      <div className="flex justify-center px-0 md:px-8 py-4" style={{ background: "#F5ECD7" }}>
        <div
          className="w-full overflow-hidden"
          style={{
            // Mobile: ancho completo con relación 1:1 (cuadrado Instagram)
            // Desktop: ancho fijo tipo post con relación 4:5
            maxWidth: "min(100%, 500px)",
            boxShadow: "0 4px 32px rgba(26,58,74,0.10)",
          }}
        >
          {/* ── Cabecera estilo stories / post ── */}
          <div
            className="flex items-center gap-2.5 px-3 py-2.5"
            style={{ background: "white", borderBottom: "1px solid rgba(58,155,155,0.12)" }}
          >
            {/* Avatar placeholder con iniciales */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3A9B9B, #C9A84C)" }}
            >
              <span className="font-playfair text-white text-xs font-bold">Z&G</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-cormorant font-semibold text-sm tracking-wide" style={{ color: "#1A3A4A" }}>
                zabdi.y.gerardo
              </span>
              <span className="font-cormorant text-xs" style={{ color: "#5A7A68" }}>
                Chuburna Puerto · Yucatán
              </span>
            </div>
            {/* Punto decorativo dorado */}
            <div className="ml-auto">
              <svg viewBox="0 0 16 16" className="w-4 h-4">
                <circle cx="8" cy="4"  r="1.5" fill="#C9A84C" fillOpacity="0.6"/>
                <circle cx="8" cy="8"  r="1.5" fill="#C9A84C" fillOpacity="0.6"/>
                <circle cx="8" cy="12" r="1.5" fill="#C9A84C" fillOpacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* ── Imagen cuadrada 1:1 con parallax ── */}
          <div
            className="relative overflow-hidden w-full"
            style={{ aspectRatio: "1 / 1" }}
          >
            <motion.img
              src={photo.url}
              alt="Zabdi & Gerardo"
              className="absolute inset-0 w-full object-cover"
              style={{ y: imageY, scale: 1.18, height: "100%" }}
              loading="lazy"
            />
            {/* Viñeta muy sutil solo en los bordes — NO cubre la imagen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 40px rgba(26,58,74,0.15)",
              }}
            />
          </div>

          {/* ── Footer tipo Instagram: likes + caption ── */}
          <motion.div
            style={{ opacity: captionOp, y: captionY }}
            className="px-3 pt-2.5 pb-3"
            // fondo blanco roto cálido
            // background inline para que no quede blanco duro
          >
            {/* Likes / corazón decorativo */}
            <div className="flex items-center gap-3 mb-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.5 5 11 6 12 7.5C13 6 14.5 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z"
                  fill="#E8896A"
                  fillOpacity="0.85"
                />
              </svg>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  stroke="#3A9B9B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Separador */}
              <div className="flex-1" />
              {/* Fecha */}
              <span className="font-cormorant text-xs tracking-widest" style={{ color: "#5A7A68" }}>
                29 · 08 · 2026
              </span>
            </div>

            {/* Caption */}
            <p className="font-cormorant text-sm leading-snug" style={{ color: "#1A3A4A" }}>
              <span className="font-semibold tracking-wide" style={{ color: "#3A9B9B" }}>zabdi.y.gerardo&nbsp;</span>
              <span className="italic" style={{ color: "#5A7A68" }}>{photo.caption}</span>
            </p>

            {/* Hashtag decorativo */}
            <p className="font-cormorant text-xs mt-1" style={{ color: "#3A9B9B", opacity: 0.7 }}>
              #ZabdiYGerardo #BodaEnLaPlaya #Yucatán2026
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}