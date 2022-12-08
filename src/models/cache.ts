import { createLogger } from '@logger'
import { ReplaySubject, ClientResponseError } from '@deps'
import { htmlCollection } from '@db'
import { id } from '@types'
import { HtmlCacheCollection } from '../validators/html_cache.ts'

const rpSubject = new ReplaySubject<string>(50)
export { rpSubject as cacheModelRpSubject }

const logger = await createLogger(
  {
    kind: 'cache',
    type: 'html'
  },
  rpSubject
)

export const getHTML = async (url: URL) => {
  try {
    const t0 = performance.now()
    const result = await htmlCollection.getFirstListItem<HtmlCacheCollection>(`url='${url}'`)
    const t1 = performance.now()
    logger.debug(`[Operation Time:${t1 - t0}ms] Cached URL -> ${url}`)

    return result
  } catch (error) {
    if (error instanceof ClientResponseError) {
      logger.debug(`No matches for url in html_collection -> ${url}`)
      throw error
    } else {
      logger.critical('Error while trying to get match for url in html_collection:', error)
      Deno.exit(1)
    }
  }
}

export const deleteHTML = async (id: id) => {
  try {
    const t0 = performance.now()
    const result = await htmlCollection.delete(id)
    const t1 = performance.now()
    logger.debug(`[Operation Time:${t1 - t0}ms] Cached URL -> ${id}`)

    return result
  } catch (error) {
    if (error instanceof ClientResponseError) {
      logger.debug(`No matches for id in html_collection -> ${id}`)
      throw error
    } else {
      logger.critical('Error while trying to get match for url in html_collection:', error)
      throw error
    }
  }
}

export const createHTML = async (url: URL, html: string) => {
  try {
    const t0 = performance.now()
    const { id } = await htmlCollection.create({
      url,
      html
    })

    const t1 = performance.now()
    logger.debug(`[Operation Time:${t1 - t0}ms] Cached URL -> ${url}`)

    return id as id
  } catch (error) {
    logger.critical(`Error while creating a record in html_cache collection for url ${url} `, error)
    throw error
  }
}
