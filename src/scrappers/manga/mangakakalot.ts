import { getEnv } from '../../config.ts'
import { urlToCheery } from '@utils'

export const indexPage = async (page: number) => {
  const url = new URL(
    `${getEnv('MANGAKAKALOT_URL')}/manga_list?type=latest&category=all&state=all&page=${page}`
  )
  const $ = await urlToCheery(url)
}
