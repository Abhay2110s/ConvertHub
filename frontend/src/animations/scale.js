import React from "react";

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, delay }
});

export const scaleOut = (delay = 0) => ({
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, delay }
});
