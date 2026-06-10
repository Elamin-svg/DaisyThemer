// src/server/session.ts
import {
    getRequestHeader,
    setResponseHeader,
} from '@tanstack/react-start/server'

const SESSION_COOKIE = '__Host-session'
const ONE_DAY = 60 * 60 * 24

export function setSessionCookie(token: string) {
    setResponseHeader(
        'Set-Cookie',
        [
            `${SESSION_COOKIE}=${token}`,
            `HttpOnly`,
            `Secure`,
            `SameSite=Lax`,
            `Path=/`,
            `Max-Age=${ONE_DAY}`,
        ].join('; '),
    )
}

export function clearSessionCookie() {
    setResponseHeader(
        'Set-Cookie',
        `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
    )
}

export function readSessionToken(): string | null {
    const header = getRequestHeader('cookie')
    if (!header) return null
    for (const part of header.split(/;\s*/)) {
        const eq = part.indexOf('=')
        if (eq === -1) continue
        if (part.slice(0, eq) === SESSION_COOKIE) return part.slice(eq + 1)
    }
    return null
}