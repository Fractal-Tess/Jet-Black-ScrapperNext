import { indexPage } from '@scrappers/manga/mangakakalot.ts'
import { describe, it } from '@deps'

describe('Mangakakalot scrapper', () => {
  it('indexer scrapes first page of mangakakalot', async () => {
    const result = await indexPage(1)
    console.log(result)
  })
})
