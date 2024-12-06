import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
			'@core': '/src/components/core',
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
	plugins: [react()],
	// plugins: [react(), eslintPlugin()],
	server: {
		// port: 3000,
		port: isProduction ? 4015 : 3000,
	},
});
