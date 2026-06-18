'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { SunIcon } from './icons/SunIcon'
import { MoonIcon } from './icons/MoonIcon'

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center"
                aria-label="Changer de thème"
            >
                <div className="w-4 h-4 bg-gray-400 dark:bg-slate-600 rounded-full" />
            </button>
        )
    }

    return (
        <button
            onClick={() => {
                const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
                setTheme(nextTheme)
            }}
            className="w-10 h-10 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Changer de thème"
        >
            {resolvedTheme === 'dark' ? (
                <SunIcon className="w-4 h-4 text-yellow-500" />
            ) : (
                <MoonIcon className="w-4 h-4 text-slate-600" />
            )}
        </button>
    )
}
