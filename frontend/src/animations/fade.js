import React from "react";

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay }
});

export const fadeOut = (delay = 0) => ({
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  transition: { duration: 0.5, delay }
});
