import { motion } from "framer-motion";

// Paleta – teal:#3A9B9B  gold:#C9A84C  sand:#F5ECD7

export default function FloralDivider() {
  return (
    <div className="flex items-center justify-center py-8" style={{ background: "#F5ECD7" }}>
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Ola izquierda – se desvanece hacia la izquierda */}
        <svg viewBox="0 0 100 40" className="w-12 md:w-20 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveLeftFade" x1="0" x2="1">
              <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0"/>
              <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0.28"/>
            </linearGradient>
          </defs>
          <path d="M0,20 Q25,5 50,20 T100,20 V40 H0 Z" fill="url(#waveLeftFade)"/>
        </svg>

        {/* Línea izquierda con degradado */}
        <svg viewBox="0 0 80 2" className="w-12 md:w-20 h-0.5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineLeft" x1="0" x2="1">
              <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0"/>
              <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0.45"/>
            </linearGradient>
          </defs>
          <rect width="80" height="2" fill="url(#lineLeft)"/>
        </svg>

        {/* Ornamento central – dorado arena */}
        <svg viewBox="0 0 60 30" className="w-16 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="15" r="5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
          <circle cx="30" cy="15" r="9" fill="none" stroke="#C9A84C" strokeWidth="0.7"/>
          <line x1="15" y1="15" x2="21" y2="15" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="39" y1="15" x2="45" y2="15" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="30" y1="2" x2="30" y2="6" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="30" y1="24" x2="30" y2="28" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="19" y1="6" x2="22" y2="9" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="38" y1="21" x2="41" y2="24" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="41" y1="6" x2="38" y2="9" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="22" y1="21" x2="19" y2="24" stroke="#C9A84C" strokeWidth="1"/>
        </svg>

        {/* Línea derecha con degradado */}
        <svg viewBox="0 0 80 2" className="w-12 md:w-20 h-0.5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineRight" x1="0" x2="1">
              <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect width="80" height="2" fill="url(#lineRight)"/>
        </svg>

        {/* Ola derecha – se desvanece hacia la derecha */}
        <svg viewBox="0 0 100 40" className="w-12 md:w-20 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveRightFade" x1="0" x2="1">
              <stop offset="0%"   stopColor="#3A9B9B" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="#3A9B9B" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,20 Q25,25 50,20 T100,20 V0 H0 Z" fill="url(#waveRightFade)"/>
        </svg>
      </motion.div>
    </div>
  );
}