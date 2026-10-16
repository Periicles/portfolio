// Allumage néon déclenché à chaque changement de thème, comme une machine
// qui redémarre :
// 1. un voile animé (`.neon-ignite`) simule une coupure de courant, puis le
//    retour de la lumière ;
// 2. chaque bloc visible se rallume ensuite à son tour, dans un ordre
//    aléatoire (`.neon-boot`), certains avec des amorces ratées.
// Les animations sont définies dans globals.css. Rien n'est ajouté si
// l'utilisateur limite les mouvements.

// Blocs rallumés individuellement ; seul le plus externe est animé quand
// plusieurs sont imbriqués.
const BOOT_BLOCKS =
    'nav li, nav a, nav button, nav p, main h1, main h2, main h3, main p, main li, main a, main button, main form'

const BOOT_START_MS = 350
const BOOT_SPREAD_MS = 1100
const HARD_START_RATIO = 0.25
const CLEANUP_MS = 2400

let cleanupTimer: ReturnType<typeof setTimeout> | undefined

function clearBoot() {
    clearTimeout(cleanupTimer)
    document.querySelector('.neon-ignite')?.remove()
    document.querySelectorAll<HTMLElement>('.neon-boot').forEach((el) => {
        el.classList.remove('neon-boot', 'neon-boot-hard')
        el.style.removeProperty('--boot-delay')
    })
}

function bootBlocks(trigger?: Element | null) {
    const viewportHeight = window.innerHeight
    const blocks = [...document.querySelectorAll<HTMLElement>(BOOT_BLOCKS)].filter((el) => {
        if (el.parentElement?.closest(BOOT_BLOCKS)) return false
        // Le bouton cliqué reste allumé : il confirme l'action.
        if (trigger && el.contains(trigger)) return false
        const rect = el.getBoundingClientRect()
        return rect.width > 0 && rect.bottom > 0 && rect.top < viewportHeight
    })

    for (const el of blocks) {
        const delay = BOOT_START_MS + Math.random() * BOOT_SPREAD_MS
        el.style.setProperty('--boot-delay', `${Math.round(delay)}ms`)
        el.classList.add('neon-boot')
        if (Math.random() < HARD_START_RATIO) el.classList.add('neon-boot-hard')
    }
}

export function igniteNeon(trigger?: Element | null) {
    clearBoot()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const veil = document.createElement('div')
    veil.className = 'neon-ignite'
    veil.setAttribute('aria-hidden', 'true')
    veil.addEventListener('animationend', () => veil.remove(), { once: true })
    document.body.appendChild(veil)

    bootBlocks(trigger)
    cleanupTimer = setTimeout(clearBoot, CLEANUP_MS)
}

// Script inline du layout, exécuté avant l'affichage du contenu : il plonge
// la page dans le noir (`data-neon-power`) jusqu'à ce que `NeonBootOnLoad`
// lance l'allumage, une fois React hydraté.
export const neonPowerOffScript =
    "if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.setAttribute('data-neon-power', '')"
