import { getHTML, createHTML } from '@models/cache.ts'
import { getEnv } from '@config'
import { cheerio, retry } from '@deps'

const useCache = getEnv('DENO_ENV') === 'development'

/**
 *
 * @param {url} URL to fetch for cheerio
 * @returns {cheerio.CheerioAPI | never } cheerio object, or **throws**
 */
export const urlToCheery = async (url: URL): Promise<cheerio.CheerioAPI | never> => {
  if (!useCache) {
    const html = await urlToText(url) //throws
    const $ = cheerio.load(html)
    return $
  }

  try {
    const { html } = await getHTML(url)
    const $ = cheerio.load(html)
    return $
  } catch (_) {
    const html = await urlToText(url) //throws
    await createHTML(url, html)
    const $ = cheerio.load(html)
    return $
  }
}

export const urlToText = async (url: URL): Promise<string | never> => {
  const maxTry = 5
  const text = await retry(
    async () => {
      const res = await fetch(url)
      return await res.text()
    },
    {
      delay: 0,
      maxTry
    }
  )
  return text
}
