
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const COLORS = [
  "#8B5CF6", // Violet
  "#F43F5E", // Pink
  "#FDE047", // Yellow
  "#5EEAD4", // Mint
];

export default function GlobalCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  /* ============================================
     MOUSE POSITION
  ============================================ */

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Exact black cursor position */

  const pointerX = useSpring(mouseX, {
    stiffness: 1400,
    damping: 45,
    mass: 0.04,
  });

  const pointerY = useSpring(mouseY, {
    stiffness: 1400,
    damping: 45,
    mass: 0.04,
  });

  /* Decorative particles move slower */

  const particleX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  const particleY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  /* ============================================
     DESKTOP DETECTION
  ============================================ */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine)"
    );

    const update = () => {
      setEnabled(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener(
      "change",
      update
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  /* ============================================
     COLOR CYCLE
  ============================================ */

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setColorIndex((current) => {
        return (current + 1) % COLORS.length;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [enabled]);

  /* ============================================
     MOUSE EVENTS
  ============================================ */

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handleMouseOver = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const interactive =
        event.target.closest(
          `
          a,
          button,
          input,
          textarea,
          select,
          [role="button"],
          [data-cursor]
          `
        );

      setHovering(Boolean(interactive));
    };

    const handleMouseOut = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const interactive =
        event.target.closest(
          `
          a,
          button,
          input,
          textarea,
          select,
          [role="button"],
          [data-cursor]
          `
        );

      if (interactive) {
        setHovering(false);
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );
    };
  }, [
    enabled,
    mouseX,
    mouseY,
  ]);

  if (!enabled) {
    return null;
  }

  const currentColor =
    COLORS[colorIndex];

//   const nextColor =
//     COLORS[
//       (colorIndex + 1) % COLORS.length
//     ];

  const previousColor =
    COLORS[
      (colorIndex - 1 + COLORS.length) %
        COLORS.length
    ];

  return (
    <>
      {/* ==========================================
          BLACK POINTER DOT
          This is the actual cursor.
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-100000
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-black
        "
        style={{
          x: pointerX,
          y: pointerY,
        }}
        animate={{
          scale: hovering ? 1.4 : 1,
        }}
        transition={{
          duration: 0.16,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* ==========================================
          SOFT COLOR BLOB
          No ring / no border.
          Just a subtle organic color behind
          the pointer.
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99996
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          backgroundColor: currentColor,

          opacity: hovering
            ? 0.18
            : 0.10,

          scale: hovering
            ? 1.4
            : 1,

          borderRadius: [
            "38% 62% 63% 37% / 41% 44% 56% 59%",
            "55% 45% 68% 32% / 40% 62% 38% 60%",
            "62% 38% 41% 59% / 55% 40% 60% 45%",
            "45% 55% 58% 42% / 38% 62% 38% 62%",
            "38% 62% 63% 37% / 41% 44% 56% 59%",
          ],
        }}
        transition={{
          backgroundColor: {
            duration: 0.6,
            ease: "easeInOut",
          },

          opacity: {
            duration: 0.2,
          },

          scale: {
            duration: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          },

          borderRadius: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* ==========================================
          PINK PARTICLE
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99998
          h-2.5
          w-2.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-2
          border-black
          bg-[#F43F5E]
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          translateX: hovering
            ? 25
            : 19,

          translateY: hovering
            ? -22
            : -16,

          scale: hovering
            ? 1.2
            : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* ==========================================
          MINT PARTICLE
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99998
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-2
          border-black
          bg-[#5EEAD4]
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          translateX: hovering
            ? -24
            : -18,

          translateY: hovering
            ? 20
            : 14,

          scale: hovering
            ? 1.2
            : 1,
        }}
        transition={{
          duration: 0.34,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* ==========================================
          YELLOW PARTICLE
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99997
          h-1.5
          w-1.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-[1.5px]
          border-black
          bg-[#FDE047]
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          translateX: hovering
            ? 18
            : 14,

          translateY: hovering
            ? 25
            : 18,

          scale: hovering
            ? 1.15
            : 1,
        }}
        transition={{
          duration: 0.38,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* ==========================================
          SMALL VIOLET PARTICLE
      ========================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99997
          h-1.5
          w-1.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-[1.5px]
          border-black
          bg-[#8B5CF6]
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          translateX: hovering
            ? -20
            : -15,

          translateY: hovering
            ? -25
            : -19,

          scale: hovering
            ? 1.15
            : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* ==========================================
          SPARKLE
      ========================================== */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-99995
          hidden
          -translate-x-1/2
          -translate-y-1/2
          text-sm
          font-black
          md:block
        "
        style={{
          x: particleX,
          y: particleY,
        }}
        animate={{
          color: previousColor,

          translateX: hovering
            ? -27
            : -22,

          translateY: hovering
            ? -25
            : -20,

          rotate: 360,

          scale: hovering
            ? 1.15
            : 0.9,
        }}
        transition={{
          color: {
            duration: 0.5,
          },

          translateX: {
            duration: 0.25,
          },

          translateY: {
            duration: 0.25,
          },

          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },

          scale: {
            duration: 0.2,
          },
        }}
      >
        ✦
      </motion.span>
    </>
  );
}




