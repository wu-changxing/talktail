export const i18n = {
    defaultLocale: 'en',
    locales: ['en','es', 'de','fr', 'cs','zh-hans'],
} as const

export type Locale = (typeof i18n)['locales'][number]