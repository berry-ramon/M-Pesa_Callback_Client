/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*jsx", "./src/components/*jsx"],
  theme: {
    extend: {
      boxShadow: {
        neumorphic: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
        "neumorphic-inset":
          "inset 8px 8px 16px #d9d9d9, inset -8px -8px 16px #ffffff",
      },
      colors: {
        mpesa: {
          green: "#006400", // MPESA green
          lightGreen: "#00A300", // Light green for accents
          black: "#000000", // MPESA black
          white: "#FFFFFF", // MPESA white
        },
      },
    },
  },
  plugins: [],
};
