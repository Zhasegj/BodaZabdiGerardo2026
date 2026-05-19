import { motion } from "framer-motion";

export default function WaxSeal() {
  return (
    <motion.div
      className="pointer-events-none flex justify-center"
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true }}
    >
      <img
        src="/pictures/ramiroyjack.png"
        alt="Sticker"
        className="w-56 h-56 md:w-64 md:h-64 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      />
    </motion.div>
  );
}
