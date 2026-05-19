import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sealContent = (
  <div className="flex flex-col items-center justify-center w-full h-full p-[10%]">
    <div
      className="w-full aspect-square rounded-full flex flex-col items-center justify-center gap-2 sm:gap-1.5"
      style={{
        background: "radial-gradient(circle at 35% 35%, #D4B85A, #BFA34A 50%, #8A7535)",
        border: "1.5px solid rgba(255,255,255,0.15)",
      }}
    >
      <span
        className="font-playfair text-[22px] sm:text-lg font-bold tracking-[0.15em]"
        style={{
          color: "#FDF8EE",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        Z&amp;G
      </span>
      <div
        className="w-[28%] aspect-square rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #3A9B9B, #1A3A4A)",
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0 20px rgba(58,155,155,0.4)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="white">
          <path d="M8 5.14v14l11-7-11-7z"/>
        </svg>
      </div>
    </div>
  </div>
);

function SealHalf({ side, exitX, exitRotate }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ x: 0, rotate: 0 }}
      exit={{ x: exitX, rotate: exitRotate }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        clipPath: side === "left"
          ? "inset(0 50% 0 0)"
          : "inset(0 0 0 50%)",
      }}
    >
      {sealContent}
    </motion.div>
  );
}

export default function SealOverlay({ onPlay }) {
  const [sealed, setSealed] = useState(true);

  const handleClick = () => {
    if (!sealed) return;
    setSealed(false);
    onPlay?.();
  };

  return (
    <AnimatePresence>
      {sealed && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: "rgba(26,58,74,0.65)",
            backdropFilter: "blur(6px)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Wax seal */}
          <div
            className="relative w-[200px] h-[200px] sm:w-[160px] sm:h-[160px] rounded-full cursor-pointer"
            onClick={handleClick}
            style={{
              background: "radial-gradient(circle at 35% 35%, #E8C96A, #C9A84C 40%, #A68A3E 70%, #7A6430)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 60px rgba(201,168,76,0.3)",
            }}
          >
            <SealHalf side="left" exitX="-100vw" exitRotate={-10} />
            <SealHalf side="right" exitX="100vw" exitRotate={10} />
          </div>

          {/* Text below seal */}
          <p
            className="font-cormorant text-lg sm:text-base tracking-[0.4em] uppercase mt-8 sm:mt-6"
            style={{ color: "#F5ECD7" }}
          >
            Toca para descubrir
          </p>
          <p
            className="font-cormorant text-sm tracking-widest mt-1"
            style={{ color: "#6ABFBF", opacity: 0.6 }}
          >
            Dale play a la música y comienza la experiencia
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
