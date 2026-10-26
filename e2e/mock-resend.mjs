// Faux serveur Resend pour les tests de bout en bout. Il accepte les envois
// comme l'API réelle (POST /emails) et les garde en mémoire pour que les tests
// puissent vérifier ce que l'action serveur a transmis (GET /__emails).
import { createServer } from 'node:http'

const port = Number(process.argv[2] ?? 3101)
const emails = []

createServer((req, res) => {
    const reply = (status, body) => {
        res.writeHead(status, { 'content-type': 'application/json' })
        res.end(JSON.stringify(body))
    }

    if (req.method === 'GET' && req.url === '/health') return reply(200, { ok: true })
    if (req.method === 'GET' && req.url === '/__emails') return reply(200, emails)

    if (req.method === 'POST' && req.url === '/emails') {
        let raw = ''
        req.on('data', (chunk) => (raw += chunk))
        req.on('end', () => {
            emails.push(JSON.parse(raw))
            reply(200, { id: `e2e_${emails.length}` })
        })
        return
    }

    reply(404, { message: 'not found' })
}).listen(port, () => console.log(`mock Resend sur :${port}`))
