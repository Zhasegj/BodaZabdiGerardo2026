import { motion } from "framer-motion";

export default function WaxSeal() {
  return (
    <motion.div
      className="pointer-events-none"
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 60px rgba(201,168,76,0.25)",
        }}
      />
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 md:w-28 md:h-28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sealWax" cx="38%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#F0D080"/>
            <stop offset="30%"  stopColor="#D4A843"/>
            <stop offset="65%"  stopColor="#B8922E"/>
            <stop offset="100%" stopColor="#7A6020"/>
          </radialGradient>
          <radialGradient id="sealShine" cx="30%" cy="28%" r="45%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.35)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          <path id="textCircle" d="M 60,60 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"/>
        </defs>
        <ellipse cx="60" cy="61" rx="52" ry="51" fill="url(#sealWax)"/>
        <ellipse cx="60" cy="61" rx="52" ry="51" fill="url(#sealShine)" opacity="0.6"/>
        <path
          d="M60 9 L63 14 L68 10 L69 16 L75 13 L74 19 L80 18 L77 24 L83 24 L78 29 L84 31 L78 35 L83 38 L77 40 L81 45 L74 45 L77 51 L70 49 L71 55 L64 52 L63 58 L57 54 L55 60 L50 55 L47 61 L43 55 L39 60 L37 54 L32 58 L31 52 L25 55 L26 49 L19 51 L22 45 L15 45 L19 40 L13 38 L18 35 L12 31 L18 29 L13 24 L19 24 L16 18 L22 19 L21 13 L27 16 L28 10 L33 14 L36 9 L39 15 L44 11 L45 17 L51 14 L51 20 L57 18 L57 24 L63 23 L60 9Z"
          fill="url(#sealWax)"
          opacity="0.6"
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.1)"  strokeWidth="0.7"/>
        <text x="60" y="56" textAnchor="middle" fontSize="18" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="2" fill="rgba(255,255,255,0.92)" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>Z&amp;G</text>
        <text x="60" y="68" textAnchor="middle" fontSize="6" fontFamily="Georgia, serif" letterSpacing="1.5" fill="rgba(255,255,255,0.65)">29 · 08 · 2026</text>
        <text fontSize="5.5" fontFamily="Georgia, serif" letterSpacing="3.2" fill="rgba(255,255,255,0.5)">
          <textPath href="#textCircle" startOffset="8%">YUCATÁN · MÉXICO · CON AMOR ·</textPath>
        </text>
        {[[60,36],[84,60],[60,84],[36,60]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle r="1.8" fill="rgba(255,255,255,0.5)"/>
            <circle r="0.8" fill="rgba(255,255,255,0.8)"/>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
