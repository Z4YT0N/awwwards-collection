import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	root: 'src',
	build: {
		outDir: '../build',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, 'src/index.html'),
			},
		},
	},
	publicDir: path.resolve(__dirname, 'public'),
	server: {
		port: 3000,
		host: true,
	},
	assetsInclude: ['**/*.vert', '**/*.frag'],
	plugins: [
		{
			name: 'raw-loader',
			transform(code, id) {
				if (id.endsWith('.vert') || id.endsWith('.frag')) {
					return {
						code: `export default ${JSON.stringify(code)}`,
						map: null,
					};
				}
			},
		},
	],
});
