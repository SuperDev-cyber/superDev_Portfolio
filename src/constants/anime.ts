export const MODAL = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  },
};

export const DRAWER = {
  variants: {
    enter: {
      opacity: 1,
      x: 0,
      duration: 0.3,
    },
    exit: {
      x: -100,
      opacity: 0,
      duration: 0.3,
    },
  },
}

export const DRAWER_RIGHT = {
  variants: {
    enter: {
      opacity: 1,
      x: 0,
      duration: 0.3,
    },
    exit: {
      x: 100,
      opacity: 0,
      duration: 0.3,
    },
  },
}