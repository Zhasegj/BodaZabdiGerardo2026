import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-08-29T14:00:00");

// Paleta – Boda en Playa Yucateca
// sandLight: #FDF8EE  fondo principal
// sand:      #F5ECD7  fondo cálido secundario
// teal:      #3A9B9B  turquesa caribeño (acento principal)
// tealLight: #6ABFBF  turquesa claro
// navy:      #1A3A4A  texto principal
// gold:      #C9A84C  dorado arena
// blush:     #E8896A  acento cálido / CTA
// sage:      #5A7A68  texto secundario

/* ── Ornamento de olas con degradado lateral ── */
function GoldOrnament() {
  return (
    <svg viewBox="0 0 300 32" className="w-64 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGradient" x1="0" x2="1">
          <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0"/>
          <stop offset="18%"  stopColor="#3A9B9B" stopOpacity="0.55"/>
          <stop offset="50%"  stopColor="#3A9B9B" stopOpacity="0.7"/>
          <stop offset="82%"  stopColor="#3A9B9B" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="waveFill" x1="0" x2="1">
          <stop offset="0%"   stopColor="#6ABFBF" stopOpacity="0"/>
          <stop offset="18%"  stopColor="#6ABFBF" stopOpacity="0.28"/>
          <stop offset="50%"  stopColor="#6ABFBF" stopOpacity="0.38"/>
          <stop offset="82%"  stopColor="#6ABFBF" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#6ABFBF" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,16 Q37,4 75,16 T150,16 T225,4 T300,16 V32 H0 Z" fill="url(#waveFill)" />
      <path d="M0,16 Q37,28 75,16 T150,16 T225,28 T300,16" fill="none" stroke="url(#waveGradient)" strokeWidth="1.6"/>
    </svg>
  );
}

/* ── Monograma de esquina con glow ── */
function Monogram({ letter }) {
  return (
    <div className="relative select-none">
      <div className="absolute inset-0 blur-2xl" style={{
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)",
      }} />
      <span
        className="font-playfair font-bold leading-none relative"
        style={{
          fontSize: "clamp(5rem, 12vw, 9rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px #C9A84C",
          opacity: 0.28,
          display: "block",
          lineHeight: 1,
        }}
      >
        {letter}
      </span>
    </div>
  );
}

/* ── Countdown ── */
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = WEDDING_DATE - now;
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-4 md:gap-6 justify-center mt-6">
      {[
        { label: "DÍAS",  value: timeLeft.days },
        { label: "HORAS", value: timeLeft.hours },
        { label: "MIN",   value: timeLeft.minutes },
        { label: "SEG",   value: timeLeft.seconds },
      ].map(({ label, value }, i) => (
        <motion.div
          key={label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          <div
            className="rounded-lg px-3 py-2 backdrop-blur-sm shadow-sm"
            style={{ border: "1px solid rgba(58,155,155,0.35)", background: "rgba(245,236,215,0.72)" }}
          >
            <div className="text-2xl md:text-3xl font-playfair font-bold tabular-nums" style={{ color: "#1A3A4A" }}>
              {String(value ?? 0).padStart(2, "0")}
            </div>
            <div className="text-[10px] tracking-widest mt-0.5 font-cormorant uppercase" style={{ color: "#3A9B9B" }}>
              {label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Olas de playa animadas en el fondo inferior ── */
function BeachWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 120 }}>
      {/* Ola trasera – más lenta, más transparente */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%]"
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ height: 80 }}
      >
        <path
          d="M0,40 Q90,15 180,40 T360,40 T540,40 T720,40 T900,15 T1080,40 T1260,40 T1440,40 V80 H0 Z"
          fill="rgba(58,155,155,0.09)"
        />
      </motion.svg>

      {/* Ola media */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%]"
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        style={{ height: 70 }}
      >
        <path
          d="M0,35 Q120,10 240,35 T480,35 T720,10 T960,35 T1200,35 T1440,10 V70 H0 Z"
          fill="rgba(58,155,155,0.13)"
        />
      </motion.svg>

      {/* Ola delantera – más rápida, más opaca */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%]"
        viewBox="0 0 1440 55"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{ height: 55 }}
      >
        <path
          d="M0,28 Q72,8 144,28 T288,28 T432,8 T576,28 T720,28 T864,8 T1008,28 T1152,28 T1296,8 T1440,28 V55 H0 Z"
          fill="rgba(106,191,191,0.16)"
        />
      </motion.svg>

      {/* Arena – capa final en el borde */}
      <div className="absolute bottom-0 left-0 right-0 h-8"
        style={{ background: "linear-gradient(to top, rgba(245,236,215,0.55), transparent)" }} />
    </div>
  );
}

/* ── Fondo de malla cálida ── */
function BackgroundMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Malla base – arena cálida */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(245,236,215,0.7) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 0% 0%,   rgba(58,155,155,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 100% 0%, rgba(58,155,155,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 30% at 50% 0%,  rgba(201,168,76,0.05) 0%, transparent 50%)
        `,
      }} />
      {/* Puntos de textura */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
    </div>
  );
}

/* ── HeroSection ── */
export default function HeroSection() {
  return (
    <section
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "#FDF8EE" }}
    >
      <BackgroundMesh />
      <BeachWaves />

      {/* Monograma Z – esquina superior izquierda */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ transform: "translate(-12%, -10%)" }}
      >
        <Monogram letter="Z" />
      </motion.div>

      {/* Monograma G – esquina superior derecha */}
      <motion.div
        className="absolute top-0 right-0 pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ transform: "translate(12%, -10%)" }}
      >
        <Monogram letter="G" />
      </motion.div>

      {/* & grande – fondo decorativo central, muy sutil */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <span
          className="font-vibes font-bold"
          style={{
            fontSize: "clamp(16rem, 40vw, 28rem)",
            color: "transparent",
            WebkitTextStroke: "1px #3A9B9B",
            opacity: 0.04,
            display: "block",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          &
        </span>
      </div>

      {/* Marco doble – dorado arena */}
      <div className="absolute inset-4 rounded-sm pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.32)" }} />
      <div className="absolute inset-6 rounded-sm pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.14)" }} />

      {/* ── Contenido ── */}
      <motion.div
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-vibes text-2xl" style={{ color: "#E8896A" }}>¡Te invitamos a nuestra boda!</p>
        <p className="font-cormorant italic text-sm tracking-widest mt-1" style={{ color: "#5A7A68" }}>
          Con la bendición de Dios y el amor que nos une...
        </p>
        <p className="font-cormorant text-sm tracking-wide mt-1" style={{ color: "#1A3A4A" }}>
          Tenemos el honor de invitarte a la celebración de nuestra boda
        </p>
      </motion.div>

      <div className="relative z-10"><GoldOrnament /></div>

      {/* Nombres */}
      <motion.div
        className="text-center mt-6 mb-2 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <div className="flex items-baseline justify-center gap-3 flex-wrap">
          <div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-none" style={{ color: "#1A3A4A" }}>Zabdi</h1>
            <p className="font-cormorant text-sm tracking-widest text-center" style={{ color: "#3A9B9B" }}>Osorio Nolasco</p>
          </div>
          <span className="font-vibes text-5xl md:text-7xl leading-none" style={{ color: "#3A9B9B" }}>&</span>
          <div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-none" style={{ color: "#1A3A4A" }}>Gerardo</h1>
            <p className="font-cormorant text-sm tracking-widest text-center" style={{ color: "#3A9B9B" }}>Sanchez Segovia</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-5 flex flex-col items-center gap-1 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <GoldOrnament />
        <p className="font-cormorant text-xl tracking-[0.3em] mt-3 font-semibold" style={{ color: "#3A9B9B" }}>
          29 · 08 · 2026
        </p>
        <p className="font-cormorant text-base tracking-widest italic" style={{ color: "#5A7A68" }}>
          Yucatán, México
        </p>
      </motion.div>

      <div className="relative z-10"><Countdown /></div>

      <motion.a
        href="#programa"
        className="mt-8 font-cormorant px-8 py-2.5 text-sm tracking-widest uppercase transition-all duration-300 relative z-10"
        style={{ border: "1px solid #3A9B9B", color: "#3A9B9B" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.04, backgroundColor: "#E8896A", borderColor: "#E8896A", color: "#fff" }}
        whileTap={{ scale: 0.97 }}
      >
        Ver detalles
      </motion.a>
    </section>
  );
}