import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import AudioPlayer from "@/components/wedding/AudioPlayer";
import SealOverlay from "@/components/wedding/SealOverlay";
import HeroSection from "@/components/wedding/HeroSection";
import ProgramaSection from "@/components/wedding/ProgramaSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import GiftSection from "@/components/wedding/GiftSection";
import FooterSection from "@/components/wedding/FooterSection";
import PhotoDivider from "@/components/wedding/PhotoDivider";
import FloralDivider from "@/components/wedding/FloralDivider";
import FallingLeaves from "@/components/wedding/FallingLeaves";
import WaxSeal from "@/components/wedding/WaxSeal";

// ── Olas de fondo fijas (sin colores rotos) ──
function BackgroundWaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0.07" />
            <stop offset="50%"  stopColor="#6ABFBF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave1)"
          d="M0,128 L50,110 L100,105 L150,115 L200,110 L250,120 L300,110 L350,95 L400,98 L450,88 L500,95 L550,85 L600,90 L650,85 L700,95 L750,88 L800,98 L850,90 L900,105 L950,100 L1000,115 L1050,110 L1100,120 L1150,115 L1200,128 L1250,120 L1300,135 L1350,125 L1400,140 L1450,130 L1500,145 L1550,140 L1600,150 L1650,145 L1700,155 L1750,150 L1800,160 L1850,155 L1900,165 L1950,160 L2000,170 L2000,128 L0,128 Z"
        />
      </svg>
      <svg className="absolute top-64 left-0 w-full h-64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.05" />
            <stop offset="50%"  stopColor="#F5ECD7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave2)"
          d="M0,128 L75,115 L150,125 L225,115 L300,130 L375,120 L450,135 L525,125 L600,140 L675,130 L750,145 L825,135 L900,150 L975,140 L1050,155 L1125,145 L1200,160 L1275,150 L1350,165 L1425,155 L1500,170 L1575,160 L1650,175 L1725,165 L1800,180 L1875,170 L1950,185 L2000,175 L2000,128 L0,128 Z"
        />
      </svg>
    </div>
  );
}

// ── Wrapper que aplica animación de entrada Y salida a cada sección ──
function AnimatedSection({ children, offsetY = 24, fadeOut = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entrada: sube desde abajo (0→0.12)
  // Salida:  sube hacia arriba (0.88→1) — espejo exacto de la entrada
  const opacity = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.12, 0.88, 1] : [0, 0.12, 1, 1],
    fadeOut ? [0,    1,    1,  0] : [0,    1,  1, 1],
  );
  const y = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.12, 0.88, 1] : [0, 0.12, 1, 1],
    fadeOut
      ? [offsetY, 0, 0, -offsetY]   // entrada desde abajo, salida hacia arriba (simétrico)
      : [offsetY, 0, 0,          0],
  );

  return (
    <motion.div ref={ref} style={{ opacity, y, willChange: "opacity, transform" }}>
      {children}
    </motion.div>
  );
}

export default function Invitacion() {
  const [overlayDone, setOverlayDone] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="font-sans relative">
      <AudioPlayer ref={audioRef} showButton={overlayDone} />
      <SealOverlay
        onPlay={() => audioRef.current?.start()}
        onExitComplete={() => setOverlayDone(true)}
      />
      <BackgroundWaves />
      {overlayDone && <FallingLeaves />}

      {/* Hero: animación solo de salida — la entrada la maneja su propio animate */}
      <AnimatedSection offsetY={0} fadeOut={true}>
        <HeroSection />
      </AnimatedSection>

      {/* PhotoDivider fuera de AnimatedSection — el parallax se rompe con opacity/transform en ancestro */}
      <PhotoDivider index={0} />

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <ProgramaSection />
      </AnimatedSection>

      <PhotoDivider index={1} />

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <RSVPSection />
      </AnimatedSection>

      <PhotoDivider index={2} ratio="3 / 4" />

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <GiftSection />
      </AnimatedSection>

      {/* Sello entre secciones — h-0 no agrega espacio */}
      <div className="relative h-0 overflow-visible z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <WaxSeal />
        </div>
      </div>

      {/* Footer: sin animación de salida — es el final de la página */}
      <AnimatedSection offsetY={20} fadeOut={false}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}