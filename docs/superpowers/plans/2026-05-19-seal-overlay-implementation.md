# Seal Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a wax-seal welcome overlay to the invitation page that blocks the page until the user clicks play, then opens with a split animation and starts the music.

**Architecture:** New `SealOverlay` component wraps the page content in `Invitacion.jsx`. A shared `isPlaying` state in the parent connects the overlay's `onPlay` callback to the `AudioPlayer` via a `forcePlay` prop. The existing floating play button remains untouched.

**Tech Stack:** React 18, framer-motion, Tailwind CSS, Vite

---

### Task 1: Modify `AudioPlayer` – Add `forcePlay` prop, remove autoplay

**Files:**
- Modify: `src/components/wedding/AudioPlayer.jsx` (full file)

- [ ] **Step 1: Open the file to read current content**

Read `src/components/wedding/AudioPlayer.jsx`.

- [ ] **Step 2: Rewrite the component to accept `forcePlay` and remove autoplay**

Replace the entire file content with:

```jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUDIO_SRC = "/audio/cancion.mp3";

export default function AudioPlayer({ forcePlay = false }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Respond to forcePlay from parent (SealOverlay click)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !forcePlay || playing) return;

    audio.volume = 0.5;
    const doPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Silently fail — user still has the floating button
      }
    };

    if (audio.readyState >= 2) {
      doPlay();
    } else {
      audio.addEventListener("canplay", doPlay, { once: true });
    }

    return () => audio.removeEventListener("canplay", doPlay);
  }, [forcePlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onCanPlay={() => setReady(true)}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: 46, height: 46,
                background: playing
                  ? "linear-gradient(135deg, #3A9B9B, #1A3A4A)"
                  : "linear-gradient(135deg, #C9A84C, #E8896A)",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                  <rect x="6" y="5" width="4" height="14" rx="1"/>
                  <rect x="14" y="5" width="4" height="14" rx="1"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              )}
              {playing && (
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(58,155,155,0.25)", animationDuration: "1.8s" }}
                />
              )}
            </motion.button>
            <motion.span
              className="font-cormorant text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(26,58,74,0.75)",
                color: "#F5ECD7",
                backdropFilter: "blur(4px)",
              }}
            >
              {playing ? "♪ Sonando" : "♪ Música"}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 3: Verify no syntax/import errors**

Run: `npm run lint -- --quiet src/components/wedding/AudioPlayer.jsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/wedding/AudioPlayer.jsx
git commit -m "feat: add forcePlay prop to AudioPlayer, remove autoplay"
```

---

### Task 2: Create `SealOverlay` component

**Files:**
- Create: `src/components/wedding/SealOverlay.jsx`

- [ ] **Step 1: Write the SealOverlay component**

Create `src/components/wedding/SealOverlay.jsx`:

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SealHalf({ side, exitX, exitRotate }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ x: 0, rotate: 0 }}
      exit={{ x: exitX, rotate: exitRotate }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        clipPath: side === "left"
          ? "inset(0 50% 0 0)"
          : "inset(0 0 0 50%)",
      }}
    >
      {sealContent}
    </motion.div>
  );
}

const sealContent = (
  <div className="flex flex-col items-center justify-center w-full h-full p-[10%]">
    <div
      className="w-full aspect-square rounded-full flex flex-col items-center justify-center gap-2 sm:gap-1.5"
      style={{
        background: "radial-gradient(circle at 35% 35%, #D4B85A, #BFA34A 50%, #8A7535)",
        border: "1.5px solid rgba(255,255,255,0.15)",
      }}
    >
      <span
        className="font-playfair text-[22px] sm:text-lg font-bold tracking-[0.15em]"
        style={{
          color: "#FDF8EE",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        Z&amp;G
      </span>
      <div
        className="w-[28%] aspect-square rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #3A9B9B, #1A3A4A)",
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0 20px rgba(58,155,155,0.4)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="white">
          <path d="M8 5.14v14l11-7-11-7z"/>
        </svg>
      </div>
    </div>
  </div>
);

export default function SealOverlay({ onPlay }) {
  const [sealed, setSealed] = useState(true);

  const handleClick = () => {
    if (!sealed) return;
    setSealed(false);
    onPlay?.();
  };

  return (
    <AnimatePresence>
      {sealed && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: "rgba(26,58,74,0.65)",
            backdropFilter: "blur(6px)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Wax seal */}
          <div
            className="relative w-[200px] h-[200px] sm:w-[160px] sm:h-[160px] rounded-full cursor-pointer"
            onClick={handleClick}
            style={{
              background: "radial-gradient(circle at 35% 35%, #E8C96A, #C9A84C 40%, #A68A3E 70%, #7A6430)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 60px rgba(201,168,76,0.3)",
            }}
          >
            <SealHalf side="left" exitX="-100vw" exitRotate={-10} />
            <SealHalf side="right" exitX="100vw" exitRotate={10} />
          </div>

          {/* Text below seal */}
          <p
            className="font-cormorant text-lg sm:text-base tracking-[0.4em] uppercase mt-8 sm:mt-6"
            style={{ color: "#F5ECD7" }}
          >
            Toca para descubrir
          </p>
          <p
            className="font-cormorant text-sm tracking-widest mt-1"
            style={{ color: "#6ABFBF", opacity: 0.6 }}
          >
            Dale play a la música y comienza la experiencia
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify file created correctly**

Run: `ls src/components/wedding/SealOverlay.jsx`
Expected: file exists

Run: `npm run lint -- --quiet src/components/wedding/SealOverlay.jsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/wedding/SealOverlay.jsx
git commit -m "feat: create SealOverlay component with split animation"
```

---

### Task 3: Wire up `SealOverlay` in `Invitacion.jsx`

**Files:**
- Modify: `src/pages/Invitacion.jsx`

- [ ] **Step 1: Read current file content**

Read `src/pages/Invitacion.jsx`.

- [ ] **Step 2: Add `isPlaying` state, import and wrap with `SealOverlay`**

Apply these edits:

1. Add `useState` to the React import:
```jsx
import { useRef, useState } from "react";
```

2. Add the SealOverlay import after AudioPlayer:
```jsx
import AudioPlayer from "@/components/wedding/AudioPlayer";
import SealOverlay from "@/components/wedding/SealOverlay";
```

3. Inside the `Invitacion` component function, add state before the return:
```jsx
export default function Invitacion() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
```

4. Update the AudioPlayer line to pass `forcePlay`:
```jsx
      <AudioPlayer forcePlay={isPlaying} />
```

5. Wrap the entire return content (inside the outer `<div>`) with the SealOverlay:
```jsx
    <div className="font-sans relative">
      <AudioPlayer forcePlay={isPlaying} />
      <SealOverlay onPlay={() => setIsPlaying(true)} />
      <BackgroundWaves />
      ...
    </div>
```

The final file should look like this:

```jsx
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import AudioPlayer from "@/components/wedding/AudioPlayer";
import SealOverlay from "@/components/wedding/SealOverlay";
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
function AnimatedSection({ children, offsetY = 24, fadeOut = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

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
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="font-sans relative">
      <AudioPlayer forcePlay={isPlaying} />
      <SealOverlay onPlay={() => setIsPlaying(true)} />
      <BackgroundWaves />

      <AnimatedSection offsetY={0} fadeOut={true}>
        <HeroSection />
      </AnimatedSection>

      <PhotoDivider index={0} />

      <AnimatedSection offsetY={16}>
        <FloralDivider />
      </AnimatedSection>

      <AnimatedSection offsetY={28}>
        <ProgramaSection />
      </AnimatedSection>

      <PhotoDivider index={1} />

      <AnimatedSection offsetY={28}>
        <RSVPSection />
      </AnimatedSection>

      <PhotoDivider index={2} />

      <AnimatedSection offsetY={20} fadeOut={false}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 3: Verify lint**

Run: `npm run lint -- --quiet src/pages/Invitacion.jsx`
Expected: No errors

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds without errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/Invitacion.jsx
git commit -m "feat: wire SealOverlay into Invitacion page"
```
