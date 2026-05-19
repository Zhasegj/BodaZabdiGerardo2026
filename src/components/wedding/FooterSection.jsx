import { motion } from "framer-motion";

// Paleta – navy:#1A3A4A  teal:#3A9B9B  gold:#C9A84C  sand:#F5ECD7

export default function FooterSection() {
  return (
    <footer
      className="text-white pt-20 pb-14 px-4 text-center relative"
      style={{ background: "linear-gradient(to bottom, #1A3A4A, #142E3C)" }}
    >

      {/* Ola sutil de fondo */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,100 Q100,120 200,100 T400,100 T600,100 T800,100 T1000,100 T1200,100 T1400,100 T1600,100"
          strokeWidth="4"
          fill="none"
          style={{ stroke: "rgba(106,191,191,0.18)" }}
        />
      </svg>

      {/* Marco interior – turquesa suave */}
      <div className="absolute inset-8 pointer-events-none" style={{ border: "1px solid rgba(58,155,155,0.18)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <p className="font-vibes text-2xl mb-1" style={{ color: "#6ABFBF" }}>Con amor,</p>
        <h2 className="font-playfair text-4xl font-bold mb-1" style={{ color: "#F5ECD7" }}>Zabdi &amp; Gerardo</h2>
        <p className="font-cormorant tracking-[0.3em] text-sm mt-2" style={{ color: "#6ABFBF" }}>29 · 08 · 2026</p>

        <div className="flex items-center justify-center gap-3 mt-4 mb-3">
          <div className="w-10 h-px" style={{ background: "rgba(201,168,76,0.5)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(201,168,76,0.5)" }} />
          <div className="w-10 h-px" style={{ background: "rgba(201,168,76,0.5)" }} />
        </div>

        <p className="font-cormorant italic text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Yucatán, México</p>
      </motion.div>
    </footer>
  );
}