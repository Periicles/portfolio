'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Mail } from 'lucide-react'
import { sendContactMessage, type ContactState } from '@/actions/contact'

const initialState: ContactState = { status: 'idle', message: '' }

const fieldClass =
    'w-full rounded border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent-strong font-semibold rounded hover:bg-accent hover:text-ink transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {pending ? 'Envoi en cours…' : 'Envoyer le message'}
            <Mail className="w-4 h-4" />
        </button>
    )
}

export default function ContactForm() {
    const [state, formAction] = useActionState(sendContactMessage, initialState)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Nom
                </label>
                <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email
                </label>
                <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    Message
                </label>
                <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} className={`${fieldClass} resize-y`} />
            </div>

            <div aria-hidden className="hidden">
                <label htmlFor="company">Société</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <SubmitButton />

            <p
                aria-live="polite"
                className={
                    state.status === 'success'
                        ? 'text-accent-strong'
                        : state.status === 'error'
                          ? 'text-red-600 dark:text-red-400'
                          : 'sr-only'
                }
            >
                {state.message}
            </p>
        </form>
    )
}
