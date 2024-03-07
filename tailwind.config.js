/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				// 'hero-pattern': "url('/svg_background/spring.svg')",
				'hero-pattern': "url('/svg_background/spring_black.svg')",
				// "hero-pattern": "url('/svg_background/clouds.svg')",
			},
			fontFamily: {
				barlow: ['Barlow SemiBold', 'Helvetica', 'Arial', 'sans-serif'],
			},

			keyframes: {
				underlineAnimation: {
					'0%': {
						transform: 'scaleX(0)',
						transformOrigin: '50% 100%',
					},
					'100%': {
						transform: 'scaleX(1)',
						transformOrigin: '50% 100%',
					},
				},
			},
		},
	},
	plugins: [],
	important: true,
};
