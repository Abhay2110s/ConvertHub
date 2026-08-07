import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// ---- Design tokens for the cartoon/sticker direction -----------------
// Ink:      #1A1A1A  (outlines + text)
// Cream:    #FFF8EC  (background)
// Violet:   #8B5CF6  (primary blob / accent)
// Hot pink: #F43F5E  (secondary blob)
// Sun:      #FDE047  (badge / highlight)
// Mint:     #5EEAD4  (tertiary blob)
// Display face: Fredoka (rounded, bouncy) — used only for the headline
// and stickers, kept out of body copy so it doesn't get cartoonish
// where it needs to be readable.
// ------------------------------------------------------------------------

const CONVERSIONS = [
  { from: "1 USD", to: "83.2 INR" },
  { from: "1 KM", to: "0.62 MI" },
  { from: "100 °F", to: "37.8 °C" },
  { from: "1 KG", to: "2.20 LB" },
  { from: "1 BTC", to: "$64,210" },
  { from: "1 HR", to: "3,600 S" },
];

const headline = ["Every", "Conversion.", "One", "Platform."];

const wordVariants = {
  hidden: { opacity: 0, y: 28, rotate: -3 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: 0.5 + i * 0.09, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

// Irregular "blob" outlines — each one hand-tuned so no two look alike.
const BLOB_SHAPES = [
  "63% 37% 54% 46% / 43% 47% 53% 57%",
  "37% 63% 44% 56% / 55% 41% 59% 45%",
  "55% 45% 68% 32% / 40% 62% 38% 60%",
  "48% 52% 35% 65% / 60% 38% 62% 40%",
];

function useFredoka() {
  useEffect(() => {
    if (document.getElementById("fredoka-font")) return;
    const link = document.createElement("link");
    link.id = "fredoka-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function Blob({ className, color, shapeIndex, size, delay = 0 }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute border-[3px] border-black ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: BLOB_SHAPES[shapeIndex % BLOB_SHAPES.length],
        boxShadow: "6px 6px 0px rgba(26,26,26,0.9)",
      }}
      animate={{
        y: [0, -14, 0],
        rotate: [0, 6, -4, 0],
      }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Ticker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CONVERSIONS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const current = CONVERSIONS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className="
      relative inline-flex items-center gap-2
      rounded-full border-[3px] border-black bg-white
      px-4 py-1.5 text-xs font-bold text-zinc-800
      shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
      sm:text-sm
      "
    >
      {/* speech-bubble tail */}
      <span
        aria-hidden
        className="absolute -bottom-2.25 left-8 h-3 w-3 rotate-45 border-b-[3px] border-r-[3px] border-black bg-white"
      />

      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-600" />
      </span>

      <span className="tabular-nums">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.from}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {current.from}
          </motion.span>
        </AnimatePresence>
      </span>

      <ArrowRight className="h-3 w-3 shrink-0 text-violet-600" strokeWidth={3} />

      <span className="tabular-nums">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.to}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="inline-block"
          >
            {current.to}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

export default function Hero() {
  useFredoka();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Magnetic button — nudges toward the cursor within a small radius.
  const btnRef = useRef(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringX = useSpring(btnX, { stiffness: 300, damping: 20, mass: 0.4 });
  const btnSpringY = useSpring(btnY, { stiffness: 300, damping: 20, mass: 0.4 });

  const handleBtnMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    btnX.set(relX * 0.2);
    btnY.set(relY * 0.3);
  };
  const handleBtnLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const fredoka = { fontFamily: "'Fredoka', sans-serif" };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: "#FFF8EC" }}
    >
      {/* Halftone dot texture — comic-print feel, faded at the edges */}
      <div
        aria-hidden
        className="
        absolute inset-0
        bg-[radial-gradient(rgba(26,26,26,0.16)_1.5px,transparent_1.5px)]
        bg-size-[16px_16px]
        mask-[radial-gradient(ellipse_65%_65%_at_50%_35%,black_5%,transparent_78%)]
        "
      />

      {/* Floating sticker blobs */}
      <Blob className="left-[6%] top-[14%]" color="#8B5CF6" shapeIndex={0} size={140} delay={0} />
      <Blob className="right-[8%] top-[20%]" color="#FDE047" shapeIndex={1} size={90} delay={1.2} />
      <Blob className="left-[12%] bottom-[12%]" color="#5EEAD4" shapeIndex={2} size={110} delay={0.6} />
      <Blob className="right-[10%] bottom-[16%]" color="#F43F5E" shapeIndex={3} size={130} delay={1.8} />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* ConvertHub sticker badge */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
          animate={{ opacity: 1, rotate: -4, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="
          mt-16 inline-block rounded-full border-[3px] border-black
          bg-[#FDE047] px-5 py-2
          text-sm font-bold uppercase tracking-[0.2em] text-black
          shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
          sm:text-base
          "
        >
          ConvertHub
        </motion.div>

        <h1
          style={fredoka}
          className="
          mt-10
          text-5xl
          font-bold
          leading-[1.05]
          tracking-tight
          text-black
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          "
        >
          <span className="inline-block">
            {headline.slice(0, 2).map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="mr-4 inline-block last:mr-0"
                style={{ textShadow: "4px 4px 0px #8B5CF6" }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          <span>
            {headline.slice(2).map((word, i) => (
              <motion.span
                key={word}
                custom={i + 2}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="mr-4 inline-block last:mr-0"
                style={{
                  background: "linear-gradient(90deg,#8B5CF6,#EC4899,#F43F5E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "2px #1A1A1A",
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="
          relative mt-5 inline-block
          text-sm font-bold uppercase tracking-[0.3em] text-violet-700
          sm:text-base
          "
        >
          Precision, instantly.
          <svg
            aria-hidden
            viewBox="0 0 200 12"
            className="absolute -bottom-2 left-0 w-full text-pink-400"
            preserveAspectRatio="none"
          >
            <path
              d="M2 8 Q 50 -2, 100 6 T 198 4"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="
          mt-9
          max-w-2xl
          text-base
          leading-8
          text-zinc-700
          sm:text-lg
          "
        >
          Convert units, currencies, finance, dates, health, and everyday
          calculations instantly with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="mt-7"
        >
          <Ticker />
        </motion.div>

        {/* CTA Button — sticker style with a hard offset shadow that
            presses flat on hover/click, like a real pressed button. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-11"
        >
          <motion.div
            ref={btnRef}
            style={{ x: btnSpringX, y: btnSpringY }}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            className="inline-block"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              style={fredoka}
              className="
              group
              relative
              rounded-full
              border-[3px]
              border-black
              bg-[#8B5CF6]
              px-8
              py-6
              text-base
              font-semibold
              text-black
              shadow-[6px_6px_0px_rgba(26,26,26,0.9)]
              transition-all
              duration-200
              hover:translate-x-0.75
              hover:translate-y-0.75
              hover:bg-[#7C3AED]
              hover:shadow-[3px_3px_0px_rgba(26,26,26,0.9)]
              active:translate-x-1.5
              active:translate-y-1.5
              active:shadow-none
              "
            >
              <span className="relative flex items-center text-white">
                Start Exploring
                <ArrowRight
                  className="
                  ml-2
                  h-5
                  w-5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  "
                  strokeWidth={3}
                />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.4 }}
          className="
          mt-16
          text-xs
          font-bold
          uppercase
          tracking-[0.35em]
          text-zinc-600
          "
        >

        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.6 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-5 items-start justify-center rounded-full border-[3px] border-black bg-white p-1.5"
          >
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-black"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}