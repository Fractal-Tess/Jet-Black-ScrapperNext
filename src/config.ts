import { dotenv } from '@deps'

dotenv.config({ export: true })

interface ConfigSchema {
  POCKET_BASE_URL: string
  POCKET_BASE_ADMIN_EMAIL: string
  POCKET_BASE_ADMIN_PASSWORD: string

  SURREAL_DB_URL: string

  CONSUMET_URL: string

  GOGOANIME_URL: string

  MANGAKAKALOT_URL: string
  MANGANATO_URL: string
  CHAPMANGANATO_URL: string

  LATEST_SCRAPE_INTERVAL: string

  INDEX: string

  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug'
}

export const getEnv = (env: keyof ConfigSchema) => Deno.env.get(env)
