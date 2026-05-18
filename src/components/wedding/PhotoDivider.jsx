import { motion } from "framer-motion";

// Paleta – teal:#3A9B9B  sand:#F5ECD7  navy:#1A3A4A

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
  return (
    <div className="relative h-56 md:h-80 overflow-hidden" style={{ background: "#F5ECD7" }}>
      <motion.img
        src={photo.url}
        alt="Zabdi & Gerardo"
        className="w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Overlay cálido – menos negro, más marino */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,58,74,0.45) 0%, rgba(26,58,74,0.25) 50%, rgba(26,58,74,0.55) 100%)" }} />

      {/* Shimmer turquesa */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-pulse" style={{ background: "linear-gradient(to right, rgba(58,155,155,0.08), transparent, rgba(58,155,155,0.08))" }} />
      </div>

      {/* Caption */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="font-vibes text-3xl md:text-5xl drop-shadow-lg text-center px-4" style={{ color: "#F5ECD7" }}>
          {photo.caption}
        </p>
        <div className="flex items-center gap-3 mt-3" style={{ color: "#6ABFBF" }}>
          <div className="w-12 h-px" style={{ background: "#6ABFBF" }} />
          <span className="font-cormorant tracking-widest text-xs uppercase">Zabdi &amp; Gerardo</span>
          <div className="w-12 h-px" style={{ background: "#6ABFBF" }} />
        </div>
      </motion.div>
    </div>
  );
}