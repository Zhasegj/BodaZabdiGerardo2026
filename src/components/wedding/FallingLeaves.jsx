import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#C9A84C", "#E8896A"];

function Leaf({ color, x, size, duration, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: -size }}
      animate={{
        y: [`0vh`, `110vh`],
        x: [0, 10, -8, 6, -4, 0],
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
        width={size * 0.625}
        height={size}
        viewBox="0 0 20 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2 C18 8 18 20 10 28 C2 20 2 8 10 2Z"
          fill={color}
          opacity={0.65}
        />
        <path
          d="M10 2 C18 8 18 20 10 28 C2 20 2 8 10 2Z"
          fill="none"
          stroke={color}
          strokeWidth="0.4"
          opacity={0.5}
        />
        <path d="M10 2 L10 28" stroke={color} strokeWidth="0.5" opacity={0.5} />
        <path
          d="M10 6 L14 10M10 10 L15 14M10 14 L16 18M10 18 L14 22M10 22 L13 25"
          stroke={color}
          strokeWidth="0.3"
          opacity={0.35}
        />
        <path
          d="M10 6 L6 10M10 10 L5 14M10 14 L4 18M10 18 L6 22M10 22 L7 25"
          stroke={color}
          strokeWidth="0.3"
          opacity={0.35}
        />
        <path d="M10 28 L10 32" stroke={color} strokeWidth="0.8" opacity={0.5} />
      </svg>
    </motion.div>
  );
}

export default function FallingLeaves({ count = 8 }) {
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      x: `${Math.random() * 100}vw`,
      size: 24 + Math.random() * 12,
      duration: 20 + Math.random() * 10,
      delay: Math.random() * -25,
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
