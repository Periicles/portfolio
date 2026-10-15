'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Mail } from 'lucide-react'
import { sendContactMessage, type ContactState } from '@/actions/contact'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

type FormLabels = Dictionary['form']

const initialState: ContactState = { status: 'idle', message: '' }

const fieldClass =
    'w-full rounded border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent'

function SubmitButton({ t }: { t: FormLabels }) {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent-strong font-semibold rounded hover:bg-accent hover:text-ink transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {pending ? t.sending : t.submit}
            <Mail className="w-4 h-4" />
        </button>
    )
}

export default function ContactForm({ locale, t }: { locale: Locale; t: FormLabels }) {
    const [state, formAction] = useActionState(sendContactMessage, initialState)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <input type="hidden" name="locale" value={locale} />

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    {t.name}
                </label>
                <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    {t.email}
                </label>
                <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    {t.message}
                </label>
                <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} className={`${fieldClass} resize-y`} />
            </div>

            <div aria-hidden className="hidden">
                <label htmlFor="company">{t.honeypot}</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <SubmitButton t={t} />

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
