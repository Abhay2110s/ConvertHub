
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";

/* =========================================================
   FONT
========================================================= */

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

/* =========================================================
   FOOTER LINKS
========================================================= */

const footerLinks = {
  Product: [
    {
      label: "Converters",
      sectionId: "categories",
    },
    {
      label: "Features",
      sectionId: "features",
    },
    {
      label: "How It Works",
      sectionId: "how-it-works",
    },
  ],

  Explore: [

    {
      label: "Stats",
      sectionId: "stats",
    },
    {
      label: "CTA",
      sectionId: "cta",
    },
  ],

  Connect: [
    {
      label: "GitHub",
      href: "https://github.com/Abhay2110s",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/abhay-singh-btech",
      external: true,
    },
    {
      label: "Email",
      href: "mailto:abhaysingh14922@gmail.com",
      external: true,
    },
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

export default function LandingFooter() {
  useFredoka();

  const footerRef = useRef(null);

  const inView = useInView(footerRef, {
    once: true,
    margin: "-80px",
  });

  /* =======================================================
     SMOOTH SCROLL
  ======================================================== */

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(
        `LandingFooter: Section with id "${id}" was not found.`
      );
      return;
    }

    const headerOffset = 80;

    const elementPosition =
      element.getBoundingClientRect().top;

    const offsetPosition =
      elementPosition +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  /* =======================================================
     BACK TO TOP
  ======================================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="
        relative
        overflow-hidden
        border-t-[3px]
        border-black
      "
      style={{
        backgroundColor: "#FFF8EC",
      }}
    >
      {/* =====================================================
          HALFTONE DOT BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(rgba(26,26,26,0.13)_1.5px,transparent_1.5px)]
          bg-size-[16px_16px]
          mask-[radial-gradient(ellipse_80%_70%_at_50%_35%,black_5%,transparent_85%)]
          [-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,black_5%,transparent_85%)]
        "
      />

      {/* =====================================================
          SECONDARY DOT TEXTURE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          bg-[radial-gradient(rgba(26,26,26,0.07)_1px,transparent_1px)]
          bg-size-[32px_32px]
          mask-[radial-gradient(ellipse_65%_65%_at_50%_40%,black,transparent_78%)]
          [-webkit-mask-image:radial-gradient(ellipse_65%_65%_at_50%_40%,black,transparent_78%)]
        "
      />

      {/* =====================================================
          COLOR WASHES
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_12%_25%,rgba(139,92,246,0.09),transparent_35%),radial-gradient(circle_at_88%_30%,rgba(244,63,94,0.08),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(94,234,212,0.10),transparent_40%)]
        "
      />

      {/* =====================================================
          LEFT VIOLET BLOB
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-64
          w-64
          border-[3px]
          border-black/10
        "
        style={{
          background: "rgba(139,92,246,0.11)",
          borderRadius:
            "61% 39% 47% 53% / 45% 57% 43% 55%",
        }}
        animate={{
          y: [0, 18, 0],
          rotate: [0, 7, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          RIGHT PINK BLOB
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          top-28
          h-56
          w-56
          border-[3px]
          border-black/10
        "
        style={{
          background: "rgba(244,63,94,0.10)",
          borderRadius:
            "43% 57% 64% 36% / 58% 42% 55% 45%",
        }}
        animate={{
          y: [0, -16, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
        "
      >
        {/* ===================================================
            TOP FOOTER CONTENT
        ==================================================== */}

        <div
          className="
            grid
            gap-14
            py-16
            md:grid-cols-[1.4fr_2fr]
            md:py-20
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {/* Brand logo */}

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{
                rotate: -2,
                y: -3,
              }}
              whileTap={{
                y: 1,
              }}
              transition={{
                duration: 0.18,
              }}
              className="
                inline-flex
                items-center
                gap-3
                bg-transparent
                p-0
                text-left
              "
            >
              <span
                className="
                  flex
                  h-12
                  w-12
                  rotate-[-5deg]
                  items-center
                  justify-center
                  rounded-[38%_62%_45%_55%/55%_43%_57%_45%]
                  border-[3px]
                  border-black
                  bg-[#8B5CF6]
                  text-white
                  shadow-[4px_4px_0px_#1A1A1A]
                "
              >
                <Zap
                  className="h-6 w-6"
                  fill="currentColor"
                  strokeWidth={2.5}
                />
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                }}
                className="
                  text-3xl
                  font-bold
                  text-black
                "
              >
                Convertly
              </span>
            </motion.button>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-md
                text-base
                leading-7
                text-zinc-600
              "
            >
              Simple tools for converting units, currencies,
              and everyday values without the unnecessary
              complexity.
            </p>

            {/* Yellow sticker */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: 5,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 3,
                    }
                  : {}
              }
              transition={{
                delay: 0.25,
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                border-[3px]
                border-black
                bg-[#FDE047]
                px-4
                py-2
                text-sm
                font-bold
                text-black
                shadow-[4px_4px_0px_#1A1A1A]
              "
              style={{
                borderRadius:
                  "48% 52% 44% 56% / 55% 43% 57% 45%",
              }}
            >
              <Sparkles
                className="h-4 w-4"
                strokeWidth={2.8}
              />

              Made to be simple
            </motion.div>
          </motion.div>

          {/* =================================================
              NAVIGATION COLUMNS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-10
              sm:grid-cols-3
            "
          >
            {Object.entries(footerLinks).map(
              ([title, links], columnIndex) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 25,
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
                    delay: 0.12 * columnIndex,
                    duration: 0.55,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {/* Column heading */}

                  <h3
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                    }}
                    className="
                      text-lg
                      font-bold
                      text-black
                    "
                  >
                    {title}
                  </h3>

                  {/* Links */}

                  <div className="mt-5 space-y-3">
                    {links.map((link) => {
                      /* =====================================
                         EXTERNAL LINK
                      ====================================== */

                      if (link.external) {
                        return (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                              x: 5,
                            }}
                            transition={{
                              duration: 0.18,
                            }}
                            className="
                              group
                              flex
                              w-fit
                              items-center
                              gap-2
                              text-sm
                              font-medium
                              text-zinc-600
                              transition-colors
                              hover:text-black
                            "
                          >
                            <span>{link.label}</span>

                            <ArrowUpRight
                              className="
                                h-3.5
                                w-3.5
                                -translate-x-0.5
                                translate-y-0.5
                                opacity-0
                                transition-all
                                duration-150
                                group-hover:translate-x-0
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                              strokeWidth={2.5}
                            />
                          </motion.a>
                        );
                      }

                      /* =====================================
                         INTERNAL SECTION LINK
                      ====================================== */

                      return (
                        <motion.button
                          key={link.label}
                          type="button"
                          onClick={() =>
                            scrollToSection(
                              link.sectionId
                            )
                          }
                          whileHover={{
                            x: 5,
                          }}
                          transition={{
                            duration: 0.18,
                          }}
                          className="
                            group
                            flex
                            w-fit
                            items-center
                            gap-2
                            bg-transparent
                            p-0
                            text-sm
                            font-medium
                            text-zinc-600
                            transition-colors
                            hover:text-black
                          "
                        >
                          <span>{link.label}</span>

                          <ArrowUpRight
                            className="
                              h-3.5
                              w-3.5
                              -translate-x-0.5
                              translate-y-0.5
                              opacity-0
                              transition-all
                              duration-150
                              group-hover:translate-x-0
                              group-hover:translate-y-0
                              group-hover:opacity-100
                            "
                            strokeWidth={2.5}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div
          className="
            relative
            h-0.75
            overflow-hidden
            bg-black
          "
        >
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={
              inView
                ? {
                    scaleX: 1,
                  }
                : {}
            }
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              absolute
              inset-0
              origin-left
              bg-[#8B5CF6]
            "
          />
        </div>

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}

        <motion.div
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
            delay: 0.45,
            duration: 0.5,
          }}
          className="
            flex
            flex-col
            gap-5
            py-7
            text-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Copyright */}

          <p className="text-zinc-500">
            © {new Date().getFullYear()} Convertly.
            All rights reserved.
          </p>

          {/* Heart */}

          <div
            className="
              flex
              items-center
              gap-2
              text-zinc-500
            "
          >
            <span>Built with</span>

            <motion.span
              animate={{
                scale: [1, 1.18, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex"
            >
              <Heart
                className="
                  h-4
                  w-4
                  fill-[#F43F5E]
                  text-[#F43F5E]
                "
                strokeWidth={2.5}
              />
            </motion.span>

            <span>
               by Abhay for simpler conversions.
            </span>
          </div>

          {/* Back to top */}

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{
              y: -3,
              rotate: -2,
            }}
            whileTap={{
              y: 1,
              x: 1,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border-[3px]
              border-black
              bg-white
              px-4
              py-2
              font-bold
              text-black
              shadow-[3px_3px_0px_#1A1A1A]
              transition-shadow
              hover:shadow-[5px_5px_0px_#1A1A1A]
            "
          >
            Back to top

            <ArrowUpRight
              className="h-4 w-4"
              strokeWidth={2.5}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM COLOR STRIP
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          relative
          z-10
          flex
          h-3
          w-full
        "
      >
        <div className="w-1/4 bg-[#8B5CF6]" />
        <div className="w-1/4 bg-[#F43F5E]" />
        <div className="w-1/4 bg-[#FDE047]" />
        <div className="w-1/4 bg-[#5EEAD4]" />
      </div>
    </footer>
  );
}

