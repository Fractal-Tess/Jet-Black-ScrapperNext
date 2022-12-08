export type { EnvVars } from '@validators/env.ts'
export type { HtmlCacheCollection } from '@validators/html_cache.ts'

export type Brand<K, T> = K & { __brand: T }
export type id = Brand<string, 'id'>
