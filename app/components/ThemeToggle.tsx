'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

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
                aria-label="Changer de theme"
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
            aria-label="Changer de theme"
        >
            {resolvedTheme === 'dark' ? (
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm0-10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z" />
                    <path d="M12 4c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1s-1 .448-1 1v2c0 .552.448 1 1 1zm0 16c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1s1-.448 1-1v-2c0-.552-.448-1-1-1zm8-8c0 .552.448 1 1 1h2c.552 0 1-.448 1-1s-.448-1-1-1h-2c-.552 0-1 .448-1 1zM4 12c0-.552-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1h2c.552 0 1-.448 1-1zm12.364-6.364c.391-.391.391-1.024 0-1.414l-1.414-1.414c-.391-.391-1.024-.391-1.414 0s-.391 1.024 0 1.414l1.414 1.414c.391.391 1.024.391 1.414 0zm-8.485 8.485c-.391.391-.391 1.024 0 1.414l-1.414 1.414c-.391.391-1.024.391-1.414 0s-.391-1.024 0-1.414l1.414-1.414c.391-.391 1.024-.391 1.414 0zm8.485 0c-.391.391-1.024.391-1.414 0l-1.414-1.414c-.391-.391-.391-1.024 0-1.414s1.024-.391 1.414 0l1.414 1.414c.391.391.391 1.024 0 1.414zm-8.485-8.485c.391-.391 1.024-.391 1.414 0l1.414 1.414c.391.391.391 1.024 0 1.414s-1.024.391-1.414 0l-1.414-1.414c-.391-.391-.391-1.024 0-1.414z" />
                </svg>
            ) : (
                <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                </svg>
            )}
        </button>
    )
}
