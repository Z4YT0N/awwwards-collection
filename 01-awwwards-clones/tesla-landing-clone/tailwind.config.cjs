/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Gotham SSm, sans-serif'],
		},
		extend: {
			maxWidth: {
				'anchor': '17rem',
			},
			screens: {
				'2xs': '400px',
				'1.5xs': '475px',
				'1.25xs': '500px',
				'xs': '550px',
				'2md': '807px',
				'2.5xl': '1375px',
			},
			gridTemplateRows: {
				'auto': 'auto',
			},
			objectPosition: {
				'mobile': '50% 25%',
			},
			textColor: {
				'default': '#171A20CC',
			},
			backgroundColor: {
				'neutral': '#171A20CC',
			},
		},
	},
	plugins: [
		require('tailwindcss-animated'),
	],
}
