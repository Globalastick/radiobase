import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'RADIOBASE',
				short_name: 'RADIOBASE',
				description: 'Application for listening to Internet radio stations',
				display: 'standalone',
				scope: '/radiobase',
				start_url: '/radiobase',
				theme_color: '#f7e7d9',
				background_color: '#f7e7d9',
				icons: [
					{
						src: 'logo-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'logo-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	base: '/radiobase',
	resolve: {
		alias: {
			src: '/src',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use 'src/styles/helpers' as *;`,
			},
		},
	},
})
