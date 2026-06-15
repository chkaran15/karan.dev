"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  const words = ["Design", "Build", "Deploy", "Scale"];

  const WORD_DURATION = 900;
  const TOTAL_DURATION = words.length * WORD_DURATION;

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);
      const next = Math.floor(progress * 100);

      setCount(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(onComplete, 400);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [onComplete, TOTAL_DURATION]);

  const currentWord =
    words[Math.min(words.length - 1, Math.floor((count / 100) * words.length))];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      className="bg-background fixed inset-0 z-9999"
    >
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-primary absolute top-6 left-6 text-xs tracking-[.3em] uppercase"
      >
        Dev Portfolio
      </motion.p>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-accent text-5xl italic md:text-7xl"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="font-display text-primary absolute right-6 bottom-8 text-7xl tabular-nums drop-shadow-[0_0_18px_var(--glow)] md:text-9xl">
        {String(count).padStart(3, "0")}
      </span>

      <div className="bg-border/50 absolute inset-x-0 bottom-0 h-[3px]">
        <div
          className="accent-gradient h-full origin-left transition-transform"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px var(--glow)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default LoadingScreen;

// It takes random 4 words when we reload the page.
// "use client";

// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";

// function LoadingScreen({ onComplete }: { onComplete: () => void }) {
//   const [count, setCount] = useState(0);

//   const words = [
//     "Think",
//     "Design",
//     "Inspire",
//     "Build",
//     "Deploy",
//     "Deliver",
//     "Scale",
//   ];

//   const [selectedWords] = useState(() =>
//     [...words].sort(() => Math.random() - 0.5).slice(0, 4),
//   );

//   useEffect(() => {
//     const start = performance.now();
//     let frame = 0;

//     const tick = (now: number) => {
//       const next = Math.min(
//         100,
//         Math.floor(((now - start) / 2700) * 100),
//       );

//       setCount(next);

//       if (next < 100) {
//         frame = requestAnimationFrame(tick);
//       } else {
//         setTimeout(onComplete, 400);
//       }
//     };

//     frame = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(frame);
//   }, [onComplete]);

//   const currentWord =
//     selectedWords[
//       Math.min(
//         selectedWords.length - 1,
//         Math.floor((count / 100) * selectedWords.length),
//       )
//     ];

//   return (
//     <motion.div
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.55 }}
//       className="fixed inset-0 z-9999 bg-background"
//     >
//       <motion.p
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="absolute left-6 top-6 text-xs uppercase tracking-[.3em] text-muted-foreground"
//       >
//         Dev Portfolio
//       </motion.p>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <AnimatePresence mode="wait">
//           <motion.span
//             key={currentWord}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -20, opacity: 0 }}
//             className="font-display text-5xl italic text-foreground/80 md:text-7xl"
//           >
//             {currentWord}
//           </motion.span>
//         </AnimatePresence>
//       </div>

//       <span className="absolute bottom-8 right-6 font-display text-7xl tabular-nums text-foreground md:text-9xl">
//         {String(count).padStart(3, "0")}
//       </span>

//       <div className="absolute inset-x-0 bottom-0 h-[3px] bg-border/50">
//         <div
//           className="accent-gradient h-full origin-left transition-transform"
//           style={{
//             transform: `scaleX(${count / 100})`,
//             boxShadow: "0 0 8px var(--glow)",
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// export default LoadingScreen;
