import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        manifest: true,
        lib: {
            entry: 'resources/js/lumen.js',
            name: 'Lumen',
            fileName: 'lumen',
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].[hash].js',
            },
        },
    },
})
