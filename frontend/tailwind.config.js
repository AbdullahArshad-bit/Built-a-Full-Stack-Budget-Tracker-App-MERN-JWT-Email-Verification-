/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        accent: "#10b981",
        danger: "#ef4444",
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.1)",
      },
    },
  },
  plugins: [],
};

