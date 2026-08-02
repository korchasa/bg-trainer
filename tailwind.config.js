/** @type {import('tailwindcss').Config} */
export default {
  // Touch browsers keep :hover on the last tapped element until the next tap.
  // Answer buttons are re-rendered in place for the next question, so the
  // stale hover border read as "the previous answer is still selected".
  // This wraps every `hover:` utility in `@media (hover: hover)`.
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // FR-A11Y-TEXT: rescaled type ramp. Floor raised from 12px to 13px so no
      // interactive label falls below the Apple HIG minimum; top lowered from
      // 72px to 60px so a single screen spans 4.6x instead of 8x.
      // Sizes are rem-based, so the --fs-scale root multiplier scales all of them.
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.125rem" }],   // 13px
        sm: ["0.9375rem", { lineHeight: "1.3125rem" }],  // 15px
        base: ["1.0625rem", { lineHeight: "1.5rem" }],   // 17px
        lg: ["1.1875rem", { lineHeight: "1.625rem" }],   // 19px
        xl: ["1.3125rem", { lineHeight: "1.75rem" }],    // 21px
        "2xl": ["1.5rem", { lineHeight: "1.875rem" }],   // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],  // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],    // 36px
        "5xl": ["2.75rem", { lineHeight: "1.1" }],       // 44px
        "6xl": ["3.25rem", { lineHeight: "1.1" }],       // 52px
        "7xl": ["3.75rem", { lineHeight: "1.05" }],      // 60px
      },
      // FR-RESPONSIVE-LAYOUT: breakpoint below every iPhone width, so narrow
      // windows (SE at 320pt) can drop a padding step. Layout keys off window
      // width, never device class.
      screens: {
        xs: "380px",
      },
    },
  },
  plugins: [],
}
