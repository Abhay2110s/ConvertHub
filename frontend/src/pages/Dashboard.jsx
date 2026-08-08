
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  Search,
  Sparkles,
  Ruler,
  CircleDollarSign,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";

import { categories } from "../data/categories";
import { unitConverters } from "../data/unitConverters";
import { financeCalculators } from "../data/financeCalculators";
import { dateTimeCalculators } from "../data/dateTimeCalculators";
import { everydayCalculators } from "../data/everydayCalculators";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import SearchBar from "../components/dashboard/SearchBar";

const tools = [
  ...unitConverters.map((x) => ({
    id: x.id,
    title: x.name,
    category: "Unit Conversion",
  })),
  ...financeCalculators.map((x) => ({
    id: x.id,
    title: x.name,
    category: "Finance",
  })),
  ...dateTimeCalculators.map((x) => ({
    id: x.id,
    title: x.name,
    category: "Date & Time",
  })),
  ...everydayCalculators.map((x) => ({
    id: x.id,
    title: x.name,
    category: "Everyday",
  })),
];

const CATEGORY_COLORS = [
  "#8B5CF6",
  "#FDE047",
  "#5EEAD4",
  "#F43F5E",
];

function getCategoryIcon(category) {
  if (category === "Unit Conversion") return Ruler;
  if (category === "Finance") return CircleDollarSign;
  if (category === "Date & Time") return CalendarDays;
  return Sparkles;
}

export default function Dashboard() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#FFF8EC] text-black">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-50 border-b-[3px] border-black bg-white">
        <DashboardHeader />
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative">

        {/* =================================================
            BACKGROUND — SAME CONVERTHUB THEME
        ================================================= */}

        {/* Grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.42]
            [background-image:linear-gradient(#00000012_1px,transparent_1px),linear-gradient(90deg,#00000012_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Purple blob */}
        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-96
            w-96
            rounded-full
            bg-[#8B5CF6]
            opacity-[0.12]
            blur-3xl
          "
        />

        {/* Cyan blob */}
        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 20, -15, 0],
            scale: [1, 0.95, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            right-[-160px]
            top-[35%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#5EEAD4]
            opacity-[0.13]
            blur-3xl
          "
        />

        {/* Pink blob */}
        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-[42%]
            top-[55%]
            h-72
            w-72
            rounded-full
            bg-[#F43F5E]
            opacity-[0.07]
            blur-3xl
          "
        />

        {/* =================================================
            CONTENT WRAPPER
        ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative py-16 sm:py-20">

            <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px]">

              {/* Hero copy */}

              <div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                    rotate: -3,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: -2,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    border-[3px]
                    border-black
                    bg-[#F43F5E]
                    px-4
                    py-2
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-white
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  <Sparkles size={15} strokeWidth={3} />
                  ConvertHub Dashboard
                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.08,
                    duration: 0.6,
                  }}
                  className="
                    mt-7
                    max-w-4xl
                    text-5xl
                    font-black
                    leading-[0.92]
                    sm:text-6xl
                    lg:text-7xl
                  "
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  Convert anything.
                  <br />

                  <span className="text-[#8B5CF6]">
                    Calculate everything.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.16,
                    duration: 0.5,
                  }}
                  className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-7
                    text-zinc-600
                    sm:text-lg
                  "
                >
                  A growing toolbox for units, finance,
                  dates, time and everyday calculations.
                  Fast, simple and built for real-world use.
                </motion.p>

                {/* Hero stats */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.24,
                    duration: 0.5,
                  }}
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  <div
                    className="
                      border-[3px]
                      border-black
                      bg-[#FDE047]
                      px-4
                      py-2
                      text-xs
                      font-black
                      shadow-[3px_3px_0px_#000]
                    "
                  >
                    {tools.length}+ TOOLS
                  </div>

                  <div
                    className="
                      border-[3px]
                      border-black
                      bg-[#5EEAD4]
                      px-4
                      py-2
                      text-xs
                      font-black
                      shadow-[3px_3px_0px_#000]
                    "
                  >
                    FREE TO USE
                  </div>

                  <div
                    className="
                      border-[3px]
                      border-black
                      bg-white
                      px-4
                      py-2
                      text-xs
                      font-black
                      shadow-[3px_3px_0px_#000]
                    "
                  >
                    NO SIGN UP
                  </div>
                </motion.div>
              </div>

              {/* Hero graphic */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: 7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: -4,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="
                  relative
                  mx-auto
                  flex
                  h-64
                  w-64
                  items-center
                  justify-center
                  border-[4px]
                  border-black
                  bg-[#8B5CF6]
                  shadow-[10px_10px_0px_#000]
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-5
                    border-[3px]
                    border-black
                    bg-white/20
                  "
                />

                <Calculator
                  size={100}
                  strokeWidth={2.5}
                  className="relative z-10"
                />

                <div
                  className="
                    absolute
                    -left-7
                    -top-6
                    border-[3px]
                    border-black
                    bg-[#FDE047]
                    px-3
                    py-2
                    text-xs
                    font-black
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  QUICK
                </div>

                <div
                  className="
                    absolute
                    -bottom-6
                    -right-7
                    border-[3px]
                    border-black
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-black
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  SIMPLE
                </div>
              </motion.div>
            </div>

            {/* Search */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="mx-auto mt-14 max-w-4xl"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <Search size={17} strokeWidth={3} />

                <span
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-zinc-500
                  "
                >
                  Find a tool
                </span>
              </div>

              <SearchBar />
            </motion.div>
          </section>

          {/* =================================================
              POPULAR TOOLS
          ================================================= */}

          <section className="pb-16">

            <div className="mb-8 flex items-end justify-between gap-4">

              <div>
                <div
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-zinc-400
                  "
                >
                  Start here
                </div>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                    sm:text-4xl
                  "
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  Popular Tools
                </h2>
              </div>

              <Link
                to="/popular"
                className="
                  hidden
                  items-center
                  gap-2
                  border-b-[3px]
                  border-black
                  pb-1
                  text-sm
                  font-black
                  sm:flex
                "
              >
                View all
                <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {tools.slice(0, 8).map((tool, index) => {
                const Icon = getCategoryIcon(tool.category);
                const accent =
                  CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                return (
                  <motion.div
                    key={tool.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                      rotate: index % 2 ? 1 : -1,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      delay: index * 0.045,
                      duration: 0.45,
                    }}
                  >
                    <Link
                      to={`/calculator/${tool.id}`}
                      className="
                        group
                        relative
                        block
                        overflow-hidden
                        border-[3px]
                        border-black
                        bg-white
                        p-5
                        shadow-[5px_5px_0px_#000]
                        transition-transform
                        hover:-translate-y-1
                      "
                    >
                      <div
                        className="
                          absolute
                          -right-7
                          -top-7
                          h-20
                          w-20
                          rounded-full
                          opacity-25
                          transition-transform
                          duration-300
                          group-hover:scale-150
                        "
                        style={{
                          backgroundColor: accent,
                        }}
                      />

                      <div
                        className="
                          relative
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border-[3px]
                          border-black
                          shadow-[3px_3px_0px_#000]
                          transition-transform
                          group-hover:rotate-[-6deg]
                        "
                        style={{
                          backgroundColor: accent,
                        }}
                      >
                        <Icon
                          size={21}
                          strokeWidth={3}
                        />
                      </div>

                      <h3
                        className="
                          mt-5
                          text-lg
                          font-black
                        "
                        style={{
                          fontFamily:
                            "'Fredoka', sans-serif",
                        }}
                      >
                        {tool.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          font-bold
                          text-zinc-400
                        "
                      >
                        {tool.category}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.15em]
                            text-zinc-400
                          "
                        >
                          Open
                        </span>

                        <ArrowRight
                          size={17}
                          strokeWidth={3}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <section className="py-16">

            <div className="flex items-end justify-between gap-4">

              <div>
                <div
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-zinc-400
                  "
                >
                  Browse
                </div>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                    sm:text-4xl
                  "
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  Explore Categories
                </h2>
              </div>

              <Link
                to="/categories"
                className="
                  hidden
                  items-center
                  gap-2
                  border-b-[3px]
                  border-black
                  pb-1
                  text-sm
                  font-black
                  sm:flex
                "
              >
                View all
                <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {categories.map((category, index) => {
                const accent =
                  category.accent ||
                  CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                return (
                  <motion.div
                    key={category.id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      to={`/category/${category.id}`}
                      className="
                        group
                        relative
                        block
                        overflow-hidden
                        border-[3px]
                        border-black
                        bg-white
                        p-6
                        shadow-[6px_6px_0px_#000]
                        transition-transform
                        hover:-translate-y-1
                      "
                    >
                      {/* Accent block */}

                      <div
                        className="
                          absolute
                          right-0
                          top-0
                          h-2
                          w-full
                        "
                        style={{
                          backgroundColor: accent,
                        }}
                      />

                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          border-[3px]
                          border-black
                          text-3xl
                          shadow-[4px_4px_0px_#000]
                          transition-transform
                          group-hover:rotate-[-5deg]
                        "
                        style={{
                          backgroundColor: accent,
                        }}
                      >
                        {category.icon}
                      </div>

                      <h3
                        className="
                          mt-6
                          text-xl
                          font-black
                        "
                        style={{
                          fontFamily:
                            "'Fredoka', sans-serif",
                        }}
                      >
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {category.description}
                      </p>

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-zinc-400
                          "
                        >
                          {category.count || 0} tools
                        </span>

                        <ArrowRight
                          size={18}
                          strokeWidth={3}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* =================================================
              COMPLETE TOOLBOX
          ================================================= */}

          <section className="pb-24 pt-10">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <div
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-zinc-400
                  "
                >
                  Everything
                </div>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                    sm:text-4xl
                  "
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  Complete Toolbox
                </h2>
              </div>

              <div
                className="
                  self-start
                  border-[3px]
                  border-black
                  bg-[#5EEAD4]
                  px-4
                  py-2
                  text-xs
                  font-black
                  shadow-[3px_3px_0px_#000]
                "
              >
                {tools.length} TOOLS
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    delay: Math.min(index * 0.025, 0.3),
                    duration: 0.35,
                  }}
                >
                  <Link
                    to={`/calculator/${tool.id}`}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-[3px]
                      border-black
                      bg-white
                      p-4
                      shadow-[3px_3px_0px_#000]
                      transition-all
                      hover:-translate-y-0.5
                      hover:shadow-[5px_5px_0px_#8B5CF6]
                    "
                  >
                    <div className="min-w-0">
                      <span className="block truncate font-black">
                        {tool.title}
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-zinc-400
                        "
                      >
                        {tool.category}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        border-[2px]
                        border-black
                        bg-[#FDE047]
                        transition-transform
                        group-hover:rotate-[-6deg]
                      "
                    >
                      <Calculator
                        size={18}
                        strokeWidth={3}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <section className="pb-20">

            <div
              className="
                relative
                overflow-hidden
                border-[3px]
                border-black
                bg-black
                px-6
                py-10
                text-white
                shadow-[8px_8px_0px_#8B5CF6]
                sm:px-10
              "
            >
              {/* Dot texture */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]
                  [background-image:radial-gradient(#fff_1px,transparent_1px)]
                  [background-size:16px_16px]
                "
              />

              <div className="relative z-10 flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">

                <div>
                  <div
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-zinc-400
                    "
                  >
                    Need something?
                  </div>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-black
                      sm:text-3xl
                    "
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                    }}
                  >
                    Search the complete ConvertHub toolbox.
                  </h3>
                </div>

                <Link
                  to="/categories"
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    gap-2
                    border-[3px]
                    border-black
                    bg-[#FDE047]
                    px-5
                    py-3
                    font-black
                    text-black
                    shadow-[4px_4px_0px_#fff]
                    transition-transform
                    hover:-translate-y-1
                  "
                >
                  Explore Categories
                  <ArrowRight
                    size={18}
                    strokeWidth={3}
                  />
                </Link>

              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

