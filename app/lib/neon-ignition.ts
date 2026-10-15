// Allumage néon déclenché à chaque changement de thème : un voile animé
// (`.neon-ignite`, défini dans globals.css) simule une coupure de courant
// puis le retour de la lumière. Rien n'est ajouté si l'utilisateur limite
// les mouvements.
export function igniteNeon() {
    document.querySelector('.neon-ignite')?.remove()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const veil = document.createElement('div')
    veil.className = 'neon-ignite'
    veil.setAttribute('aria-hidden', 'true')
    veil.addEventListener('animationend', () => veil.remove(), { once: true })
    document.body.appendChild(veil)
}
