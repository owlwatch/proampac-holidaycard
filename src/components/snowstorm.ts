export const snowStormOptions = {
  background: { color: "transparent" },
  fullScreen: { enable: false },
  detectRetina: false, // Reduce rendering complexity
  fpsLimit: 30, // Reduced from 60 for better performance

  particles: {
    number: {
      value: 0,
      limit: 80, // Dramatically reduced total particle limit
    },
  },

  emitters: [
    // FAR LAYER - Background snow (small, slow, subtle)
    {
      position: { x: 50, y: 50 }, // Center for full screen distribution
      size: { width: 100, height: 100 }, // Full screen coverage for mid-snowstorm effect
      startCount: 40, // More initial snowflakes
      rate: { quantity: 1, delay: 0.8 }, // Much slower emission
      life: { count: 30 }, // Limit total particles from this emitter

      particles: {
        number: { limit: 30 }, // Per-emitter limit
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.6 } },
        size: { value: { min: 1, max: 2 } },

        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.5, max: 1.2 },
          straight: false, // Allow natural drift
          outModes: { default: "destroy" }, // Remove particles when they exit
        },

        // Simplified wobble for far layer
        wobble: {
          enable: true,
          distance: 0.8,
          speed: { min: 0.1, max: 0.3 },
        },
      },
    },

    // MID LAYER - Main snow effect
    {
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 }, // Full screen coverage for mid-snowstorm effect
      startCount: 35, // More initial snowflakes
      rate: { quantity: 1, delay: 1.2 }, // Slower emission
      life: { count: 25 }, // Limit total particles

      particles: {
        number: { limit: 25 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.4, max: 0.7 } },
        size: { value: { min: 2, max: 4 } },

        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 1.0, max: 2.0 },
          straight: false,
          outModes: { default: "destroy" },
        },

        wobble: {
          enable: true,
          distance: 1.5,
          speed: { min: 0.2, max: 0.5 },
        },
      },
    },

    // NEAR LAYER - Foreground snow (fewer, larger, faster)
    {
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 }, // Full screen coverage for mid-snowstorm effect
      startCount: 20, // More initial snowflakes
      rate: { quantity: 1, delay: 2.0 }, // Much slower emission
      life: { count: 15 }, // Fewer total particles

      particles: {
        number: { limit: 15 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.2, max: 0.5 } }, // More transparent for realism
        size: { value: { min: 4, max: 8 } },

        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 2.0, max: 4.0 },
          straight: false,
          outModes: { default: "destroy" },
        },

        // More pronounced wobble for near layer
        wobble: {
          enable: true,
          distance: 2.5,
          speed: { min: 0.3, max: 0.8 },
        },
      },
    },
  ],
};