export const delayFallback = (importLink, delayMs = 0) =>
  new Promise((resolve) => setTimeout(() => resolve(importLink), delayMs));
