
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  CircleDollarSign,

  Ruler,
  Sparkles,
  Scale,
  Thermometer,
  Square,
  FlaskConical,
  Zap,
  Gauge,
  Fuel,
  Percent,
} from "lucide-react";
import { motion } from "framer-motion";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import { categories } from "../data/categories";
import { unitConverters } from "../data/unitConverters";
import { financeCalculators } from "../data/financeCalculators";
import { dateTimeCalculators } from "../data/dateTimeCalculators";
import { everydayCalculators } from "../data/everydayCalculators";

/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
  unit: Ruler,
  finance: CircleDollarSign,
  datetime: CalendarDays,
  everyday: Sparkles,

  length: Ruler,
  weight: Scale,
  temperature: Thermometer,
  area: Square,
  volume: FlaskConical,

  speed: Gauge,
  pressure: Gauge,
  force: Zap,
  torque: Zap,
  density: Square,
  energy: Zap,
  power: Zap,
  frequency: Gauge,
  fuelConsumption: Fuel,

  percentage: Percent,
  simpleInterest: Calculator,
  compoundInterest: Calculator,
  profitLoss: Calculator,
  discount: Percent,
  gst: Calculator,
  tax: Calculator,
  emi: Calculator,
  loan: Calculator,
  sip: Calculator,

  age: CalendarDays,
  dateDifference: CalendarDays,
  businessDays: CalendarDays,
  countdown: CalendarDays,
  timezone: CalendarDays,

  currency: CircleDollarSign,

  bmi: Scale,
  calories: Sparkles,
  cooking: Sparkles,
  clothingSize: Sparkles,
  shoeSize: Sparkles,
};

/* =========================================================
   BUILD TOOLS
========================================================= */

function buildTools(category) {
  if (category === "unit") {
    return unitConverters.map((item) => ({
      id: item.id,
      title: item.name,
      description: `Convert ${item.name
        .replace(" Converter", "")
        .toLowerCase()} values across common units.`,
    }));
  }

  if (category === "finance") {
    return financeCalculators.map((item) => ({
      id: item.id,
      title: item.name,
      description: financeDescription(item.id),
    }));
  }

  if (category === "datetime") {
    return dateTimeCalculators.map((item) => ({
      id: item.id,
      title: item.name,
      description: dateDescription(item.id),
    }));
  }

  if (category === "everyday") {
    return everydayCalculators.map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
    }));
  }

  return [];
}

/* =========================================================
   FINANCE DESCRIPTIONS
========================================================= */

function financeDescription(id) {
  return (
    {
      currency:
        "Convert between major currencies using a clear exchange-rate interface.",

      percentage:
        "Solve percentage-of, reverse percentage, change and difference problems.",

      simpleInterest:
        "Calculate simple interest and maturity amount.",

      compoundInterest:
        "Calculate compound growth with flexible compounding frequency.",

      profitLoss:
        "Find profit, loss and the corresponding percentage.",

      discount:
        "Calculate discount amount and final price.",

      gst:
        "Calculate GST amount and total including tax.",

      tax:
        "Calculate tax amount and final total.",

      emi:
        "Estimate monthly EMI, total interest and total payment.",

      loan:
        "Estimate loan payment and total interest.",

      sip:
        "Estimate SIP future value and invested amount.",
    }[id] || "A focused finance calculator for quick, clear results."
  );
}

/* =========================================================
   DATE DESCRIPTIONS
========================================================= */

function dateDescription(id) {
  return (
    {
      age:
        "Calculate age from a birth date with an optional as-of date.",

      dateDifference:
        "Compare two dates and return the elapsed duration.",

      businessDays:
        "Count weekdays between two dates.",

      countdown:
        "Calculate the remaining time until a target date and time.",

      timezone:
        "Convert a date and time between supported time zones.",
    }[id] || "A practical date and time tool."
  );
}

/* =========================================================
   CATEGORY PAGE
========================================================= */

export default function CategoryPage() {
  const { category } = useParams();

  const meta = categories.find(
    (item) => item.id === category
  );

  /* =======================================================
     INVALID CATEGORY
  ======================================================= */

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#FFF8EC]">
        <DashboardHeader />

        <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5">
          {/* Background dots */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.12]
              [background-image:radial-gradient(#000_1.2px,transparent_1.2px)]
              [background-size:18px_18px]
            "
          />

          <div className="relative z-10 text-center">
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                border-[4px]
                border-black
                bg-[#FDE047]
                shadow-[6px_6px_0px_#000]
              "
            >
              <Calculator
                size={36}
                strokeWidth={3}
              />
            </div>

            <h1
              className="
                mt-8
                text-5xl
                font-black
                text-black
              "
              style={{
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              Category Not Found
            </h1>

            <p className="mt-4 text-zinc-500">
              The category you're looking for doesn't exist.
            </p>

            <Link
              to="/dashboard"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                border-[3px]
                border-black
                bg-[#8B5CF6]
                px-5
                py-3
                font-black
                text-white
                shadow-[4px_4px_0px_#000]
                transition-transform
                hover:-translate-y-1
              "
            >
              Back to Dashboard

              <ArrowRight
                size={18}
                strokeWidth={3}
              />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const Icon =
    iconMap[category] || Calculator;

  const tools = buildTools(category);

  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <DashboardHeader />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative overflow-hidden">

        {/* ===================================================
            BACKGROUND
        =================================================== */}

        {/* Dot pattern */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.10]
            [background-image:radial-gradient(#111_1px,transparent_1px)]
            [background-size:20px_20px]
          "
        />

        {/* Purple blob */}

        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -left-32
            top-20
            h-80
            w-80
            rounded-full
            bg-[#8B5CF6]
            opacity-[0.13]
            blur-3xl
          "
        />

        {/* Teal blob */}

        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -10, 0],
            scale: [1, 0.94, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-10
            h-96
            w-96
            rounded-full
            bg-[#5EEAD4]
            opacity-[0.13]
            blur-3xl
          "
        />

        {/* Pink blob */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[45%]
            h-64
            w-64
            -translate-x-1/2
            rounded-full
            bg-[#F43F5E]
            opacity-[0.06]
            blur-3xl
          "
        />

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-5
            sm:px-8
            lg:px-10
          "
        >

          {/* =================================================
              CATEGORY SWITCHER
          ================================================= */}

          <div className="overflow-x-auto pt-8">
            <div className="flex min-w-max gap-3 pb-3">

              {categories.map((item) => {
                const CategoryIcon =
                  iconMap[item.id] || Calculator;

                const active =
                  item.id === category;

                return (
                  <Link
                    key={item.id}
                    to={`/category/${item.id}`}
                    className={`
                      flex
                      shrink-0
                      items-center
                      gap-2
                      border-[3px]
                      border-black
                      px-4
                      py-2.5
                      text-sm
                      font-black
                      shadow-[3px_3px_0px_#000]
                      transition-transform
                      hover:-translate-y-1
                      ${
                        active
                          ? "bg-[#FDE047]"
                          : "bg-white"
                      }
                    `}
                  >
                    <CategoryIcon
                      size={17}
                      strokeWidth={3}
                    />

                    {item.name}
                  </Link>
                );
              })}

            </div>
          </div>

          {/* =================================================
              HERO
          ================================================= */}

          <section
            className="
              grid
              items-center
              gap-12
              py-14
              lg:grid-cols-[1fr_280px]
            "
          >
            {/* Hero text */}

            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: -15,
                  rotate: -3,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
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
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.16em]
                  shadow-[4px_4px_0px_#000]
                "
                style={{
                  backgroundColor: meta.accent,
                }}
              >
                <Icon
                  size={15}
                  strokeWidth={3}
                />

                {meta.name}
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                }}
                className="
                  mt-7
                  text-5xl
                  font-black
                  leading-none
                  sm:text-7xl
                "
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                {meta.name}

                <span className="text-[#F43F5E]">
                  .
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
                  delay: 0.2,
                  duration: 0.5,
                }}
                className="
                  mt-5
                  max-w-2xl
                  text-lg
                  leading-7
                  text-zinc-600
                "
              >
                {meta.description}
              </motion.p>
            </div>

            {/* Hero icon */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: 6,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: -4,
              }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="
                relative
                mx-auto
                flex
                h-56
                w-56
                items-center
                justify-center
                border-[4px]
                border-black
                shadow-[9px_9px_0px_#000]
              "
              style={{
                backgroundColor: meta.accent,
              }}
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-5
                  border-[3px]
                  border-black
                  bg-white/30
                "
              />

              <Icon
                size={90}
                strokeWidth={2.5}
                className="relative z-10"
              />

              <span
                className="
                  absolute
                  -bottom-5
                  -right-5
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
                {tools.length} TOOLS
              </span>
            </motion.div>
          </section>

          {/* =================================================
              TOOLS
          ================================================= */}

          <section className="pb-24">

            <div
              className="
                mb-8
                flex
                items-end
                justify-between
                gap-4
              "
            >
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
                  Available tools
                </div>

                <h2
                  className="
                    mt-2
                    text-4xl
                    font-black
                  "
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  Pick a tool
                </h2>
              </div>

              <span
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
                {tools.length}{" "}
                {tools.length === 1
                  ? "TOOL"
                  : "TOOLS"}
              </span>
            </div>

            {tools.length > 0 ? (
              <div
                className="
                  grid
                  gap-7
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {tools.map((tool, index) => {
                  const ToolIcon =
                    iconMap[tool.id] ||
                    Calculator;

                  return (
                    <motion.div
                      key={tool.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                        rotate:
                          index % 2 ? 1 : -1,
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
                        delay: index * 0.035,
                        duration: 0.45,
                      }}
                      className="
                        group
                        border-[3px]
                        border-black
                        bg-white
                        p-6
                        shadow-[6px_6px_0px_#000]
                        transition-transform
                        hover:-translate-y-1
                      "
                    >
                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          border-[3px]
                          border-black
                          bg-[#FDE047]
                          shadow-[3px_3px_0px_#000]
                          transition-transform
                          group-hover:rotate-[-6deg]
                        "
                      >
                        <ToolIcon
                          size={23}
                          strokeWidth={3}
                        />
                      </div>

                      {/* Title */}

                      <h3
                        className="
                          mt-6
                          text-2xl
                          font-black
                        "
                        style={{
                          fontFamily:
                            "'Fredoka', sans-serif",
                        }}
                      >
                        {tool.title}
                      </h3>

                      {/* Description */}

                      <p
                        className="
                          mt-2
                          min-h-[48px]
                          text-sm
                          leading-6
                          text-zinc-500
                        "
                      >
                        {tool.description}
                      </p>

                      {/* Button */}

                      <Link
                        to={`/calculator/${tool.id}`}
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          border-[3px]
                          border-black
                          bg-[#8B5CF6]
                          px-4
                          py-2.5
                          font-black
                          text-white
                          shadow-[3px_3px_0px_#000]
                          transition-transform
                          hover:-translate-y-1
                        "
                      >
                        Open Tool

                        <ArrowRight
                          size={17}
                          strokeWidth={3}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div
                className="
                  border-[3px]
                  border-black
                  bg-white
                  px-6
                  py-12
                  text-center
                  shadow-[6px_6px_0px_#000]
                "
              >
                <Calculator
                  className="mx-auto"
                  size={40}
                  strokeWidth={3}
                />

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                  "
                  style={{
                    fontFamily:
                      "'Fredoka', sans-serif",
                  }}
                >
                  No tools yet
                </h3>

                <p className="mt-2 text-zinc-500">
                  Tools for this category are
                  coming soon.
                </p>
              </div>
            )}
          </section>

          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <section className="pb-16">
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
                shadow-[7px_7px_0px_#8B5CF6]
                sm:px-10
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]
                  [background-image:radial-gradient(#fff_1px,transparent_1px)]
                  [background-size:14px_14px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-start
                  justify-between
                  gap-7
                  sm:flex-row
                  sm:items-center
                "
              >
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
                    Need something else?
                  </div>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      sm:text-3xl
                    "
                    style={{
                      fontFamily:
                        "'Fredoka', sans-serif",
                    }}
                  >
                    Explore all ConvertHub tools.
                  </h3>
                </div>

                <Link
                  to="/dashboard"
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
                  View Dashboard

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

