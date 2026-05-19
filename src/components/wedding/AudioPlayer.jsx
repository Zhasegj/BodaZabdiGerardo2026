import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUDIO_SRC = "/audio/cancion.mp3";

const AudioPlayer = forwardRef(function AudioPlayer({ showButton = true }, ref) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady]     = useState(false);

  useImperativeHandle(ref, () => ({
    start() {
      const audio = audioRef.current;
      if (!audio || playing) return;
      audio.volume = 0.5;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    },
  }));

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onCanPlay={() => setReady(true)}
      />

      {/* Botón flotante — esquina inferior derecha */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            {/* Botón principal */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: 46, height: 46,
                background: playing
                  ? "linear-gradient(135deg, #3A9B9B, #1A3A4A)"
                  : "linear-gradient(135deg, #C9A84C, #E8896A)",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
              {playing ? (
                // Ícono pausa — dos barras
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                  <rect x="6"  y="5" width="4" height="14" rx="1"/>
                  <rect x="14" y="5" width="4" height="14" rx="1"/>
                </svg>
              ) : (
                // Ícono play
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              )}

              {/* Onda animada cuando está reproduciendo */}
              {playing && (
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(58,155,155,0.25)", animationDuration: "1.8s" }}
                />
              )}
            </motion.button>

            {/* Etiqueta pequeña */}
            <motion.span
              className="font-cormorant text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(26,58,74,0.75)",
                color: "#F5ECD7",
                backdropFilter: "blur(4px)",
              }}
            >
              {playing ? "♪ Sonando" : "♪ Música"}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default AudioPlayer;
