import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./app', import.meta.url)),
        },
    },
    test: {
        // Node par défaut ; les tests de composants passent en jsdom avec
        // l'en-tête `// @vitest-environment jsdom`.
        environment: 'node',
        include: ['app/**/*.test.{ts,tsx}'],
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
            include: ['app/**/*.{ts,tsx}'],
            exclude: ['app/**/*.test.{ts,tsx}'],
            reporter: ['text', 'html'],
        },
    },
})
