import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#C9A84C", "#E8896A"];

const LEAF_PATH =
  "M12 2C8 2 4 6 2 10c-1 2-1 5 0 7 1 2 3 4 5 5 2 1 4 1 5 0 1 1 3 1 5 0 2-1 4-3 5-5 1-2 1-5 0-7C20 6 16 2 12 2Z";

const LEAF_STEM = "M12 2v10l3 3";

function Leaf({ color, x, size, duration, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: -size }}
      animate={{
        y: [`0vh`, `110vh`],
        x: [0, 15, -10, 8, -5, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
        x: {
          duration: duration * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={LEAF_PATH} fill={color} opacity={0.7} />
        <path d={LEAF_PATH} fill="none" stroke={color} strokeWidth="0.5" opacity={0.4} />
        <path d={LEAF_STEM} fill="none" stroke={color} strokeWidth="0.8" opacity={0.5} />
      </svg>
    </motion.div>
  );
}

export default function FallingLeaves({ count = 12 }) {
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      x: `${Math.random() * 100}vw`,
      size: 16 + Math.random() * 12,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * -20,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} {...leaf} />
      ))}
    </div>
  );
}
