import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        manifest: true,
        rollupOptions: {
            input: {
                lumen: path.resolve(__dirname, 'resources/js/lumen.js'),
                components: path.resolve(__dirname, 'resources/js/components.js'),
            },
            output: {
                entryFileNames: '[name].[hash].js',
            },
        },
    },
    esbuild: {
        minifyIdentifiers: false,
    },
    plugins: [visualizer({ open: false })]
})
