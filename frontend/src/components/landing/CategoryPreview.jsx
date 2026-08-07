import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Ruler,
  Coins,
  BarChart3,
  Calendar,
  Heart,
  Calculator,
} from "lucide-react";

// Same design tokens as Hero.jsx / Stats.jsx — ink borders, hard offset
// shadows, irregular blob radii, Fredoka display face. This section runs
// on white (instead of cream) so it reads as a distinct beat in the page
// rhythm, while the sticker language stays identical.

const CATEGORIES = [
  {
    title: "Units",
    description: "Length, weight, temperature, speed and more",
    icon: Ruler,
    accent: "#8B5CF6", // violet
    shape: "38% 62% 63% 37% / 41% 44% 56% 59%",
  },
  {
    title: "Currency",
    description: "Real-time currency conversions",
    icon: Coins,
    accent: "#FDE047", // sun
    shape: "55% 45% 68% 32% / 40% 62% 38% 60%",
  },
  {
    title: "Finance",
    description: "EMI, interest, loans and investments",
    icon: BarChart3,
    accent: "#5EEAD4", // mint
    shape: "62% 38% 41% 59% / 55% 40% 60% 45%",
  },
  {
    title: "Date & Time",
    description: "Time zones, dates and duration",
    icon: Calendar,
    accent: "#F43F5E", // hot pink
    shape: "45% 55% 58% 42% / 38% 62% 38% 62%",
  },
  {
    title: "Health",
    description: "BMI, calories and health metrics",
    icon: Heart,
    accent: "#8B5CF6", // violet (cycle repeats)
    shape: "37% 63% 44% 56% / 55% 41% 59% 45%",
  },
  {
    title: "Everyday",
    description: "Quick calculations for daily needs",
    icon: Calculator,
    accent: "#FDE047", // sun (cycle repeats)
    shape: "63% 37% 54% 46% / 43% 47% 53% 57%",
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

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.07 * i,
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

function CategoryCard({ category, index, inView }) {
  const Icon = category.icon;

  return (
    <motion.button
      type="button"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{
        y: -6,
        boxShadow: `8px 8px 0px ${category.accent}`,
        transition: { duration: 0.18 },
      }}
      whileTap={{ y: -1, boxShadow: `3px 3px 0px ${category.accent}` }}
      className="
      group relative z-10 flex flex-col items-start gap-4
      border-[3px] border-black bg-white
      px-7 py-8 text-left
      "
      style={{
        borderRadius: category.shape,
        boxShadow: `5px 5px 0px ${category.accent}`,
      }}
    >
      <motion.div
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black"
        style={{ background: category.accent }}
      >
        <Icon className="h-6 w-6 text-black" strokeWidth={2.5} />
      </motion.div>

      <h3
        style={{ fontFamily: "'Fredoka', sans-serif" }}
        className="text-xl font-semibold text-black sm:text-2xl"
      >
        {category.title}
      </h3>

      <p className="text-sm leading-6 text-zinc-600 sm:text-base">
        {category.description}
      </p>
    </motion.button>
  );
}

export default function CategoryPreview() {
  useFredoka();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
    id="categories"
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
        bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.07),transparent_50%)]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            animate={inView ? { opacity: 1, rotate: -3, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="
            inline-block rounded-full border-[3px] border-black
            bg-[#5EEAD4] px-5 py-2
            text-sm font-bold uppercase tracking-[0.2em] text-black
            shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
            sm:text-base
            "
          >
            What's Inside
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="mt-6 text-3xl font-bold text-black sm:text-4xl md:text-5xl"
          >
            Explore Conversion Categories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg"
          >
            Everything you need to convert, calculate, and compare in one place.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}