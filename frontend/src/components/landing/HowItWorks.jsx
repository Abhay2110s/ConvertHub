import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenLine, Sparkles } from "lucide-react";

// Same design tokens as Hero.jsx / Stats.jsx / CategoryPreview.jsx /
// Features.jsx — ink borders, hard offset shadows, irregular blob
// radii, halftone texture, Fredoka display face, cream background.
// Accent cycle matches the rest of the page: violet, sun, mint.

const STEPS = [
  {
    number: "01",
    title: "Choose a Converter",
    description:
      "Select from hundreds of conversion tools including units, currency, finance, health, and more.",
    icon: Search,
    accent: "#8B5CF6", // violet
    shape: "38% 62% 63% 37% / 41% 44% 56% 59%",
  },
  {
    number: "02",
    title: "Enter Your Value",
    description:
      "Add your value and select the units you want to convert with a simple input.",
    icon: PenLine,
    accent: "#FDE047", // sun
    shape: "55% 45% 68% 32% / 40% 62% 38% 60%",
  },
  {
    number: "03",
    title: "Get Instant Results",
    description:
      "Receive accurate results instantly with our fast conversion engine.",
    icon: Sparkles,
    accent: "#5EEAD4", // mint
    shape: "62% 38% 41% 59% / 55% 40% 60% 45%",
  },
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

// Shared entrance pattern used by CategoryPreview / Features, with the
// alternating tilt kept as HowItWorks' own signature (like Stats' tilt).
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 32,
    scale: 0.96,
    rotate: i % 2 === 0 ? -5 : 5,
  }),
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: {
      delay: 0.07 * i,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

function StepCard({ step, index, inView }) {
  const Icon = step.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{
        y: -8,
        rotate: 0,
        boxShadow: `10px 10px 0px ${step.accent}`,
        transition: { duration: 0.18 },
      }}
      className="relative flex flex-col items-start gap-4 border-[3px] border-black bg-white px-7 py-8 text-left"
      style={{
        borderRadius: step.shape,
        boxShadow: `6px 6px 0px ${step.accent}`,
      }}
    >
      {/* Number sticker */}
      <div
        style={{ fontFamily: "'Fredoka', sans-serif" }}
        className="absolute -top-7 left-8 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-black bg-white text-lg font-bold text-black shadow-[4px_4px_0px_rgba(26,26,26,0.9)]"
      >
        {step.number}
      </div>

      <motion.div
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black"
        style={{ background: step.accent }}
      >
        <Icon className="h-6 w-6 text-black" strokeWidth={2.5} />
      </motion.div>

      <h3
        style={{ fontFamily: "'Fredoka', sans-serif" }}
        className="text-xl font-semibold text-black sm:text-2xl"
      >
        {step.title}
      </h3>

      <p className="text-sm leading-6 text-zinc-600 sm:text-base">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  useFredoka();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
    id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: "#FFF8EC" }}
    >
      {/* Halftone dot texture across the full section, same structure
          as Hero.jsx / Stats.jsx — strongest at center, fading at edges. */}
      <div
        aria-hidden
        className="
        absolute inset-0
        bg-[radial-gradient(rgba(26,26,26,0.14)_1.5px,transparent_1.5px)]
        bg-size-[16px_16px]
        mask-[radial-gradient(ellipse_70%_70%_at_50%_45%,black_5%,transparent_80%)]
        "
      />

      {/* Soft color wash so the cream isn't perfectly flat */}
      <div
        aria-hidden
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(circle_at_80%_75%,rgba(94,234,212,0.08),transparent_50%)]
        "
      />

      {/* Floating ambient blobs, echoing Stats.jsx */}
      <motion.div
        aria-hidden
        className="absolute -left-20 top-1/3 h-64 w-64 border-[3px] border-black/10"
        style={{
          background: "rgba(139,92,246,0.12)",
          borderRadius: "63% 37% 54% 46% / 43% 47% 53% 57%",
        }}
        animate={{ y: [0, 20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-20 bottom-20 h-72 w-72 border-[3px] border-black/10"
        style={{
          background: "rgba(244,63,94,0.10)",
          borderRadius: "37% 63% 44% 56% / 55% 41% 59% 45%",
        }}
        animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            animate={inView ? { opacity: 1, rotate: -3, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="
            inline-block rounded-full border-[3px] border-black
            bg-[#FDE047] px-5 py-2
            text-sm font-bold uppercase tracking-[0.2em] text-black
            shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
            sm:text-base
            "
          >
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="mt-6 text-3xl font-bold text-black sm:text-4xl md:text-5xl"
          >
            Convert Anything in Three Simple Steps
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg"
          >
            A simple workflow designed to make every conversion quick,
            accurate, and effortless.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom sticker, matching the CTA-style pill on other sections */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{
            y: -6,
            rotate: 3,
            boxShadow: "8px 8px 0px rgba(26,26,26,0.9)",
          }}
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="
          mx-auto mt-20 w-fit rounded-full border-[3px] border-black
          bg-[#F43F5E] px-6 py-3
          font-bold text-white
          shadow-[5px_5px_0px_rgba(26,26,26,0.9)]
          "
        >
          Simple. Fast. Accurate.
        </motion.div>
      </div>
    </section>
  );
}