import { createStitches } from '@stitches/react';

import {
	blue, gray
} from '@radix-ui/colors';

const config = createStitches({
	theme: {
		colors: {
			...gray,
			...blue,
			'gray13': 'rgb(18, 18, 18)',
			'gray14': 'rgb(15, 15, 15)',
			'gray15': 'rgb(12, 12, 12)',
		}
	},
	media: {
		'bp1': '(min-width: 480px)',
		'sm': '(min-width: 640px)',
		'sm2': '(min-width: 720px)',
		'md': '(min-width: 768px)',
		'lg': '(min-width: 1024px)',
		'xl': '(min-width: 1280px)',
		'2xl': '(min-width: 1536px)',
	},
	utils: {
		marginY: (value: number | string) => ({
			marginTop: value,
			marginBottom: value
		}),
		marginX: (value: number | string) => ({
			marginLeft: value,
			marginRight: value
		}),
		paddingY: (value: number | string) => ({
			paddingTop: value,
			paddingBottom: value
		}),
		paddingX: (value: number | string) => ({
			paddingLeft: value,
			paddingRight: value
		})
	}
});

export const { styled, css, getCssText, theme, createTheme, keyframes, globalCss } = config;
