import { defineConfig, devices } from '@playwright/test'

// Tests de bout en bout sur le build de production (`next start`), jamais sur
// le serveur de dev : on vérifie ce que les visiteurs reçoivent réellement.
// Resend est remplacé par un faux serveur local (`RESEND_BASE_URL`) : aucun
// email n'est envoyé et le test peut relire ce que l'action a transmis.
const PORT = 3100
const MOCK_RESEND_PORT = 3101
const isCI = Boolean(process.env.CI)

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    reporter: isCI ? [['github'], ['list']] : 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
        // Permet de pointer vers un Chromium déjà installé hors de Playwright.
        launchOptions: { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined },
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    webServer: [
        {
            command: `node e2e/mock-resend.mjs ${MOCK_RESEND_PORT}`,
            url: `http://localhost:${MOCK_RESEND_PORT}/health`,
            reuseExistingServer: !isCI,
        },
        {
            // En CI, le build est fait par l'étape précédente du workflow.
            command: isCI ? `npx next start -p ${PORT}` : `npm run build && npx next start -p ${PORT}`,
            url: `http://localhost:${PORT}`,
            reuseExistingServer: !isCI,
            timeout: 180_000,
            env: {
                RESEND_API_KEY: 're_e2e_test',
                RESEND_BASE_URL: `http://localhost:${MOCK_RESEND_PORT}`,
            },
        },
    ],
})
