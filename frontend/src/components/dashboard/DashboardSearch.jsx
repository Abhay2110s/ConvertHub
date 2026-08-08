import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  X,
  Ruler,
  CircleDollarSign,
  Database,
  Calculator,
  Thermometer,
  Clock3,
  Scale,
  Percent,
  Square,
  FlaskConical,
  CalendarDays,
} from "lucide-react";

/* =========================================================
   SEARCH DATA
   Add every calculator/converter here.
========================================================= */

const SEARCH_ITEMS = [
  {
    title: "Length Converter",
    description: "Meters, kilometers, miles, feet & more",
    category: "Unit Conversion",
    icon: Ruler,
    accent: "#8B5CF6",
    path: "/calculator/length",
    keywords: [
      "length",
      "meter",
      "meters",
      "kilometer",
      "kilometers",
      "mile",
      "miles",
      "feet",
      "foot",
      "inch",
      "distance",
    ],
  },

  {
    title: "Weight Converter",
    description: "Kilograms, grams, pounds, ounces & more",
    category: "Unit Conversion",
    icon: Scale,
    accent: "#5EEAD4",
    path: "/calculator/weight",
    keywords: [
      "weight",
      "kg",
      "kilogram",
      "gram",
      "pound",
      "lb",
      "ounce",
      "ton",
    ],
  },

  {
    title: "Temperature Converter",
    description: "Celsius, Fahrenheit & Kelvin",
    category: "Unit Conversion",
    icon: Thermometer,
    accent: "#F43F5E",
    path: "/calculator/temperature",
    keywords: [
      "temperature",
      "celsius",
      "fahrenheit",
      "kelvin",
      "degree",
      "degrees",
    ],
  },

  {
    title: "Area Converter",
    description: "Square meters, feet, acres, hectares & more",
    category: "Unit Conversion",
    icon: Square,
    accent: "#FDE047",
    path: "/calculator/area",
    keywords: [
      "area",
      "square meter",
      "square meters",
      "square feet",
      "acre",
      "acres",
      "hectare",
      "hectares",
    ],
  },

  {
    title: "Volume Converter",
    description: "Liters, gallons, milliliters & more",
    category: "Unit Conversion",
    icon: FlaskConical,
    accent: "#5EEAD4",
    path: "/calculator/volume",
    keywords: [
      "volume",
      "liter",
      "liters",
      "milliliter",
      "milliliters",
      "gallon",
      "gallons",
      "cup",
      "pint",
    ],
  },

  {
    title: "Currency Converter",
    description: "Convert between different currencies",
    category: "Currency",
    icon: CircleDollarSign,
    accent: "#FDE047",
    path: "/calculator/currency",
    keywords: [
      "currency",
      "money",
      "usd",
      "inr",
      "eur",
      "gbp",
      "dollar",
      "rupee",
      "euro",
      "pound",
      "exchange",
    ],
  },

  {
    title: "Percentage Calculator",
    description: "Calculate percentages, increases and decreases",
    category: "Math & Finance",
    icon: Percent,
    accent: "#8B5CF6",
    path: "/calculator/percentage",
    keywords: [
      "percentage",
      "percent",
      "%",
      "increase",
      "decrease",
      "difference",
      "ratio",
    ],
  },

  {
    title: "Calculator",
    description: "Perform basic mathematical calculations",
    category: "Math & Finance",
    icon: Calculator,
    accent: "#5EEAD4",
    path: "/calculator/basic",
    keywords: [
      "calculator",
      "math",
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ],
  },

  {
    title: "Data Converter",
    description: "Bytes, KB, MB, GB, TB & more",
    category: "Data",
    icon: Database,
    accent: "#F43F5E",
    path: "/calculator/data",
    keywords: [
      "data",
      "byte",
      "bytes",
      "kb",
      "kilobyte",
      "kilobytes",
      "mb",
      "megabyte",
      "megabytes",
      "gb",
      "gigabyte",
      "gigabytes",
      "tb",
      "terabyte",
      "storage",
    ],
  },

  {
    title: "Time Converter",
    description: "Seconds, minutes, hours, days & more",
    category: "Time",
    icon: Clock3,
    accent: "#FDE047",
    path: "/calculator/time",
    keywords: [
      "time",
      "second",
      "seconds",
      "minute",
      "minutes",
      "hour",
      "hours",
      "day",
      "days",
      "week",
      "weeks",
    ],
  },

  {
    title: "Date Calculator",
    description: "Calculate dates, durations and date differences",
    category: "Date & Calendar",
    icon: CalendarDays,
    accent: "#F43F5E",
    path: "/calculator/date",
    keywords: [
      "date",
      "calendar",
      "duration",
      "date difference",
      "age",
      "birthday",
    ],
  },
];

/* =========================================================
   SEARCH RESULT ITEM
========================================================= */

function SearchResult({ item, index, onSelect }) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.path}
      onClick={onSelect}
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.035,
        duration: 0.25,
      }}
      whileHover={{
        x: 4,
      }}
      className="
        group
        flex
        items-center
        gap-4
        border-b-2
        border-dashed
        border-zinc-200
        px-4
        py-3
        last:border-b-0
      "
    >
      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: -6,
          scale: 1.05,
        }}
        transition={{
          duration: 0.15,
        }}
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border-[2px]
          border-black
        "
        style={{
          backgroundColor: item.accent,
        }}
      >
        <Icon
          size={18}
          strokeWidth={2.8}
        />
      </motion.div>

      {/* Text */}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className="
              truncate
              text-sm
              font-bold
              text-black
            "
            style={{
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            {item.title}
          </h3>

          <span
            className="
              hidden
              shrink-0
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-zinc-400
              sm:inline
            "
          >
            {item.category}
          </span>
        </div>

        <p
          className="
            mt-0.5
            truncate
            text-xs
            text-zinc-500
          "
        >
          {item.description}
        </p>
      </div>

      {/* Arrow */}

      <ArrowRight
        size={18}
        strokeWidth={3}
        className="
          shrink-0
          text-zinc-400
          transition-all
          duration-200
          group-hover:translate-x-1
          group-hover:text-black
        "
      />
    </motion.a>
  );
}

/* =========================================================
   DASHBOARD SEARCH
========================================================= */

export default function DashboardSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  /* =======================================================
     SEARCH FILTER
  ======================================================= */

  const filteredItems = SEARCH_ITEMS.filter((item) => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return true;
    }

    const searchableText = [
      item.title,
      item.description,
      item.category,
      ...(item.keywords || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });

  /* =======================================================
     KEYBOARD SHORTCUTS
  ======================================================= */

  useEffect(() => {
    function handleKeyboard(event) {
      const target = event.target;

      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();

        inputRef.current?.focus();
        setFocused(true);
      }

      if (event.key === "Escape") {
        setFocused(false);
        inputRef.current?.blur();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, []);

  /* =======================================================
     CLICK OUTSIDE
  ======================================================= */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFocused(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  function clearSearch() {
    setQuery("");

    inputRef.current?.focus();

    setFocused(true);
  }

  /* =======================================================
     SELECT RESULT
  ======================================================= */

  function handleSelect() {
    setFocused(false);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={containerRef}
      className="
        relative
        z-30
        mx-auto
        max-w-4xl
        px-5
        py-12
        sm:px-8
        sm:py-16
      "
    >
      {/* =================================================
          LABEL
      ================================================= */}

      <div className="mb-5 flex justify-center">
        <motion.div
          initial={{
            opacity: 0,
            rotate: -4,
            y: 10,
          }}
          animate={{
            opacity: 1,
            rotate: -2,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
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
          <Search
            size={14}
            strokeWidth={3}
          />

          Find a tool
        </motion.div>
      </div>

      {/* =================================================
          SEARCH BOX
      ================================================= */}

      <motion.div
        animate={{
          y: focused ? -3 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="relative"
      >
        <div
          className={`
            relative
            flex
            min-h-[70px]
            items-center
            gap-3
            border-[3px]
            border-black
            bg-white
            px-4
            shadow-[6px_6px_0px_#000]
            transition-shadow
            duration-200
            sm:min-h-[78px]
            sm:px-6

            ${
              focused
                ? "shadow-[8px_8px_0px_#8B5CF6]"
                : ""
            }
          `}
        >
          {/* Search icon */}

          <motion.div
            animate={{
              rotate: focused ? -8 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border-[3px]
              border-black

              ${
                focused
                  ? "bg-[#8B5CF6]"
                  : "bg-[#FDE047]"
              }
            `}
          >
            <Search
              size={21}
              strokeWidth={3}
            />
          </motion.div>

          {/* Input */}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            onFocus={() =>
              setFocused(true)
            }
            placeholder="Search converters, calculators..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-base
              font-medium
              text-black
              outline-none
              placeholder:text-zinc-400
              sm:text-lg
            "
          />

          {/* Clear */}

          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                onClick={clearSearch}
                aria-label="Clear search"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-black
                  bg-[#F43F5E]
                  text-white
                "
              >
                <X
                  size={15}
                  strokeWidth={3}
                />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Keyboard shortcut */}

          {!query && (
            <kbd
              className="
                hidden
                shrink-0
                border-2
                border-zinc-300
                bg-zinc-50
                px-2
                py-1
                text-xs
                font-black
                text-zinc-400
                sm:block
              "
            >
              /
            </kbd>
          )}
        </div>

        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                absolute
                left-0
                right-0
                top-[calc(100%+12px)]
                overflow-hidden
                border-[3px]
                border-black
                bg-white
                shadow-[7px_7px_0px_#F43F5E]
              "
            >
              {/* Result header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b-[3px]
                  border-black
                  bg-[#FFF8EC]
                  px-4
                  py-3
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      border-2
                      border-black
                      bg-[#5EEAD4]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-zinc-600
                    "
                  >
                    {query
                      ? "Search Results"
                      : "All Tools"}
                  </span>
                </div>

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-zinc-400
                  "
                >
                  {filteredItems.length} TOOLS
                </span>
              </div>

              {/* Results */}

              {filteredItems.length > 0 ? (
                <div
                  className="
                    max-h-[420px]
                    overflow-y-auto
                    p-2
                  "
                >
                  {filteredItems.map(
                    (item, index) => (
                      <SearchResult
                        key={item.title}
                        item={item}
                        index={index}
                        onSelect={handleSelect}
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    px-6
                    py-10
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      mb-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-black
                      bg-[#FDE047]
                    "
                  >
                    <Search
                      size={20}
                      strokeWidth={3}
                    />
                  </div>

                  <h3
                    className="font-bold text-black"
                    style={{
                      fontFamily:
                        "'Fredoka', sans-serif",
                    }}
                  >
                    Nothing found
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-zinc-500
                    "
                  >
                    Try searching for another
                    converter.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* =================================================
          QUICK SEARCH TAGS
      ================================================= */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
        "
      >
        <span
          className="
            mr-1
            text-xs
            font-bold
            text-zinc-400
          "
        >
          Try:
        </span>

        {[
          "Length",
          "Currency",
          "Temperature",
          "Percentage",
          "Weight",
          "Time",
          "Data",
        ].map((tag, index) => (
          <motion.button
            key={tag}
            type="button"
            onClick={() => {
              setQuery(tag);
              setFocused(true);
            }}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className={`
              border-2
              border-black
              px-3
              py-1.5
              text-xs
              font-bold
              shadow-[2px_2px_0px_#000]

              ${
                index % 4 === 0
                  ? "bg-[#8B5CF6] text-white"
                  : index % 4 === 1
                    ? "bg-[#FDE047]"
                    : index % 4 === 2
                      ? "bg-[#5EEAD4]"
                      : "bg-[#F43F5E] text-white"
              }
            `}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </section>
  );
}