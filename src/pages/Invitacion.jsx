import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import HeroSection from "@/components/wedding/HeroSection";
import ProgramaSection from "@/components/wedding/ProgramaSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import FooterSection from "@/components/wedding/FooterSection";
import PhotoDivider from "@/components/wedding/PhotoDivider";
import FloralDivider from "@/components/wedding/FloralDivider";

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
// offset: cuánto se desplaza en Y al entrar/salir (en px)
function AnimatedSection({ children, offsetY = 24, fadeOut = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entrada: 0→0.15 del recorrido visible
  // Salida:  0.85→1  del recorrido visible (solo si fadeOut=true)
  const opacity = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.12, 0.88, 1] : [0, 0.12, 1, 1],
    fadeOut ? [0,    1,    1,  0] : [0,    1,  1, 1],
  );
  const y = useTransform(
    scrollYProgress,
    fadeOut ? [0, 0.12, 0.88, 1] : [0, 0.12, 1, 1],
    fadeOut
      ? [offsetY, 0, 0, -offsetY * 0.6]
      : [offsetY, 0, 0,              0],
  );

  return (
    <motion.div ref={ref} style={{ opacity, y, willChange: "opacity, transform" }}>
      {children}
    </motion.div>
  );
}

export default function Invitacion() {
  return (
    <div className="font-sans relative">
      <BackgroundWaves />

      {/* Hero: solo animación de salida (la entrada ya la hace con animate={}) */}
      <AnimatedSection offsetY={0} fadeOut={true}>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection offsetY={20}>
        <PhotoDivider index={0} />
      </AnimatedSection>

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <ProgramaSection />
      </AnimatedSection>

      <AnimatedSection offsetY={20}>
        <PhotoDivider index={1} />
      </AnimatedSection>

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <RSVPSection />
      </AnimatedSection>

      <AnimatedSection offsetY={20}>
        <PhotoDivider index={2} />
      </AnimatedSection>

      {/* Footer: sin animación de salida (es la última sección) */}
      <AnimatedSection offsetY={20} fadeOut={false}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}