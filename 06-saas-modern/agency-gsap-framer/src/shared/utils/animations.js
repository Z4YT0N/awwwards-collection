export const menuSlide = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: [0.645, 0.045, 0.355, 1] } },
};

export const slide = {
  initial: { x: 40 },
  enter: (i) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
};

export const scale = {
  open: { scale: 1, transition: { duration: 0.3, delay: 0.1 } },
  closed: { scale: 0, transition: { duration: 0.1 } },
};
