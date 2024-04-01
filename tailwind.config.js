/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
      "3xl": ["1.75rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.5rem", { lineHeight: "3rem" }],
      "6xl": ["3rem", { lineHeight: "3.5rem" }],
      "7xl": ["4rem", { lineHeight: "4.5rem" }],
    },
    screens: {
      xs: "375px",
      // => @media (min-width: 375px) { ... }
      ssm: "390px",
      // => @media (min-width: 390px) { ... }

      ssmx: "530px",
      // => @media (min-width: 530px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      hd: "1920px",
      // => @media (min-width: 1536px) { ... },

      "2hd": "2560px",
      // => @media (min-width: 1536px) { ... },
    },
    fontFamily: {
      inter: '"Inter"',
    },
    extend: {
      colors: {
        "nh-text": "#DBDBDB",
        "nh-text-2": "#E3E3E3",
        "nh-text-3": "#6B7280",
        "nh-text-placeholder": "#8C8C8C",
        "nh-gray": "#2D2D2D",
        "nh-gray-2": "#A9A9A9",
        "nh-purple": "#8B5CF6",
        "nh-purple-disabled": "#6545AF",
        "nh-purple-highlight": "#C89AFE",
        "nh-bgdark": "#1c1c1c",
        "nh-bglight": "#111111",
        "nh-bggray": "#2E2E2E",
        "nh-bggray-dark": "#3A3E41",
        "nh-bg-border-gray": "#9C9DA3",
        "nh-bg-light-gray": "#9CA3AF",
        "nh-bggray-medium": "#212325",
        "nh-green": "#10B981",
        "nh-green-light": "#34D399",
        "nh-red": "#EF4444",
        "nh-white": "#FFFFFF",
        "nh-table-bg": "#17191B",
        "nh-badge-bg": "#323337",
        "nh-bg-table-header": "#15181F",
        "nh-table-divider": "#23262D",
        "nh-testnet-bg": "#B98010",
        "nh-mainnet-bg": "#10B981",
        "nh-navigation-text": "#9C9DA3",
        "nh-table-container": "#212325",
        "nh-divider-gray": "#868FA0",
        "nh-blue": "#5697C6",
        "nh-gold": "#CDB187",
        "nh-yellow": "#B98010",
        "nh-skeleton-loader": "#262830",
        "nh-not-found": "#303030",
        "nh-popoup-overlay": "#0009",
        "nh-mainnet": "#10B981",
        "nh-testnet": "#FFA800",
      },
    },
    maxWidth: {
      nh: "62rem",
      "nh-nav-width": "15rem",
      "nh-content-width": "46rem",
    },
  },
  plugins: [],
};
