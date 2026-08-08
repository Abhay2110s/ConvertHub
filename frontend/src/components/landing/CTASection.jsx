
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

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

export default function CTA() {
  useFredoka();

  const sectionRef = useRef(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: "#FFF8EC" }}
    >
      {/* Background */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(rgba(26,26,26,0.14)_1.5px,transparent_1.5px)]
          bg-[length:16px_16px]
          mask-[radial-gradient(ellipse_75%_75%_at_50%_50%,black_5%,transparent_82%)]
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          bg-[radial-gradient(rgba(26,26,26,0.08)_1px,transparent_1px)]
          bg-[length:32px_32px]
        "
      />

      {/* Color washes */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_18%_28%,rgba(139,92,246,0.10),transparent_45%),radial-gradient(circle_at_82%_72%,rgba(94,234,212,0.10),transparent_45%)]
        "
      />

      {/* Purple blob */}
      <motion.div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-72
          w-72
          border-[3px]
          border-black/10
        "
        style={{
          background: "rgba(139,92,246,0.12)",
          borderRadius:
            "63% 37% 54% 46% / 43% 47% 53% 57%",
        }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pink blob */}
      <motion.div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          h-80
          w-80
          border-[3px]
          border-black/10
        "
        style={{
          background: "rgba(244,63,94,0.10)",
          borderRadius:
            "37% 63% 44% 56% / 55% 41% 59% 45%",
        }}
        animate={{
          y: [0, -18, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.94,
            rotate: -2,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="
            relative
            mx-auto
            max-w-5xl
            overflow-hidden
            border-[3px]
            border-black
            bg-white
            px-6
            py-14
            text-center
            shadow-[10px_10px_0px_rgba(26,26,26,0.9)]
            sm:px-12
            sm:py-16
            md:px-20
            md:py-20
          "
          style={{
            borderRadius:
              "4% 7% 5% 6% / 6% 4% 7% 5%",
          }}
        >
          {/* Card texture */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-30
              bg-[radial-gradient(rgba(26,26,26,0.10)_1.2px,transparent_1.2px)]
              bg-[length:14px_14px]
            "
          />

          {/* Yellow decoration */}
          <motion.div
            aria-hidden
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-36
              w-36
              border-[3px]
              border-black
            "
            style={{
              background: "#FDE047",
              borderRadius:
                "43% 57% 62% 38% / 48% 42% 58% 52%",
            }}
            animate={{
              rotate: [0, 6, -4, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Mint decoration */}
          <motion.div
            aria-hidden
            className="
              pointer-events-none
              absolute
              -bottom-12
              -left-10
              h-36
              w-36
              border-[3px]
              border-black
            "
            style={{
              background: "#5EEAD4",
              borderRadius:
                "58% 42% 37% 63% / 61% 39% 58% 42%",
            }}
            animate={{
              rotate: [0, -7, 4, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: -8,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                    rotate: -3,
                  }
                : {}
            }
            transition={{
              delay: 0.15,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="
              relative
              z-10
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border-[3px]
              border-black
              bg-[#FDE047]
              px-5
              py-2
              text-sm
              font-bold
              uppercase
              tracking-[0.18em]
              text-black
              shadow-[4px_4px_0px_rgba(26,26,26,0.9)]
              sm:text-base
            "
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.8} />
            Ready to convert?
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              delay: 0.25,
              duration: 0.6,
            }}
            style={{
              fontFamily: "'Fredoka', sans-serif",
            }}
            className="
              relative
              z-10
              mx-auto
              mt-7
              max-w-3xl
              text-4xl
              font-bold
              leading-tight
              text-black
              sm:text-5xl
              md:text-6xl
            "
          >
            Convert Anything.
            <br />

            <span className="relative inline-block">
              Get Results Instantly.

              <motion.span
                initial={{ scaleX: 0 }}
                animate={
                  inView
                    ? {
                        scaleX: 1,
                      }
                    : {}
                }
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                }}
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-2
                  w-full
                  origin-left
                  rounded-full
                  bg-[#8B5CF6]
                  sm:-bottom-3
                "
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              delay: 0.35,
              duration: 0.6,
            }}
            className="
              relative
              z-10
              mx-auto
              mt-7
              max-w-2xl
              text-base
              leading-7
              text-zinc-600
              sm:text-lg
            "
          >
            From units and currencies to everyday calculations,
            get accurate answers without the complicated setup.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              delay: 0.5,
              duration: 0.55,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="relative z-10 mt-9"
          >
            <Link
              to="/dashboard#converters"
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border-[3px]
                border-black
                bg-[#F43F5E]
                px-7
                py-4
                text-base
                font-bold
                text-white
                shadow-[6px_6px_0px_rgba(26,26,26,0.9)]
                transition-transform
                hover:-translate-y-1
                hover:shadow-[8px_8px_0px_rgba(26,26,26,0.9)]
                active:translate-x-[3px]
                active:translate-y-[3px]
                active:shadow-[2px_2px_0px_rgba(26,26,26,0.9)]
                sm:px-9
                sm:py-4
                sm:text-lg
              "
            >
              <Zap
                className="h-5 w-5"
                fill="currentColor"
                strokeWidth={2.5}
              />

              Start Converting

              <ArrowRight
                className="h-5 w-5"
                strokeWidth={2.8}
              />
            </Link>
          </motion.div>

          {/* Micro copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              delay: 0.75,
              duration: 0.5,
            }}
            className="
              relative
              z-10
              mt-6
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-zinc-500
              sm:text-sm
            "
          >
            Simple. Fast. Accurate.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

