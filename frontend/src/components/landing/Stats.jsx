import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Boxes, Zap, Infinity as InfinityIcon } from "lucide-react";

// Same design tokens as Hero.jsx — cream bg, ink borders, hard offset
// shadows, irregular blob radii, Fredoka display face.

const STATS = [
  {
    value: "20+",
    numeric: 20,
    suffix: "+",
    label: "Converters",
    icon: Boxes,
    accent: "#8B5CF6",
    shadow: "rgba(139,92,246,0.9)",
    shape: "38% 62% 63% 37% / 41% 44% 56% 59%",
  },
  {
    value: "<1s",
    label: "Instant Results",
    icon: Zap,
    accent: "#F43F5E",
    shadow: "rgba(244,63,94,0.9)",
    shape: "62% 38% 41% 59% / 55% 40% 60% 45%",
  },
  {
    value: "24/7",
    label: "Available",
    icon: InfinityIcon,
    accent: "#5EEAD4",
    shadow: "rgba(94,234,212,0.9)",
    shape: "45% 55% 58% 42% / 38% 62% 38% 62%",
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

function CountUp({ to, suffix = "", inView }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 0.8 });
  const ref = useRef(null);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function StatCard({ stat, index, inView }) {
  const Icon = stat.icon;
  const tilt = index % 2 === 0 ? -2 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: tilt * 3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{
        delay: 0.15 * index,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        y: -8,
        x: -2,
        rotate: 0,
        boxShadow: `10px 10px 0px ${stat.shadow}`,
        transition: { duration: 0.2 },
      }}
      className="
      relative flex flex-col items-center gap-3
      border-[3px] border-black bg-white
      px-8 py-10
      text-center
      "
      style={{
        borderRadius: stat.shape,
        boxShadow: `7px 7px 0px ${stat.shadow}`,
      }}
    >
      {/* Icon badge */}
      <motion.div
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        className="
        flex h-12 w-12 items-center justify-center
        rounded-full border-[3px] border-black
        "
        style={{ background: stat.accent }}
      >
        <Icon className="h-6 w-6 text-black" strokeWidth={2.5} />
      </motion.div>

      <div
        style={{ fontFamily: "'Fredoka', sans-serif" }}
        className="text-4xl font-bold tracking-tight text-black sm:text-5xl"
      >
        {stat.numeric ? (
          <CountUp to={stat.numeric} suffix={stat.suffix} inView={inView} />
        ) : (
          stat.value
        )}
      </div>

      <div className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-600 sm:text-base">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  useFredoka();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
    id="stats"
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: "#FFF8EC" }}
    >
      {/* Continuing halftone texture from the hero */}
      <div
        aria-hidden
        className="
        absolute inset-0
        bg-[radial-gradient(rgba(26,26,26,0.14)_1.5px,transparent_1.5px)]
        bg-size-[16px_16px]
        mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,black_5%,transparent_80%)]
        "
      />

      {/* Faint ambient blobs echoing the hero's sticker system */}
      <motion.div
        aria-hidden
        className="absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 border-[3px] border-black/10"
        style={{
          background: "rgba(139,92,246,0.12)",
          borderRadius: "63% 37% 54% 46% / 43% 47% 53% 57%",
        }}
        animate={{ y: [0, 20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-16 top-1/3 h-64 w-64 border-[3px] border-black/10"
        style={{
          background: "rgba(244,63,94,0.1)",
          borderRadius: "37% 63% 44% 56% / 55% 41% 59% 45%",
        }}
        animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            animate={inView ? { opacity: 1, rotate: 3, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="
            inline-block rounded-full border-[3px] border-black
            bg-[#FDE047] px-5 py-2
            text-sm font-bold uppercase tracking-[0.2em] text-black
            shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
            sm:text-base
            "
          >
            By The Numbers
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="mt-6 text-center text-3xl font-bold text-black sm:text-4xl"
        >
          Numbers that speak for themselves
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}