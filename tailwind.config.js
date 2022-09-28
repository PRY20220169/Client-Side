/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				main: "#5860FF",
				"gray-dark": "#47464B",
				gray: "#95989E",
				"gray-light": "#F7F8FB",
				"gray-lighter": "F2F2F4",
				black: "#000000",
			},
		},
	},
	plugins: [],
};
