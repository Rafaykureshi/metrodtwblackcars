/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#9b815e", // The Gold/Tan color
                secondary: "#1a1a1a", // Deep Black
                accent: "#f8f5f0", // Cream background
            },
        },
    },
    plugins: [],
};

// DTW-metro-cab