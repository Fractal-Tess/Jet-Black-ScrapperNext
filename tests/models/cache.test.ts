import { afterEach, assertRejects, describe, it, z } from '@deps'
import { createHTML, deleteHTML, getHTML } from '@models/cache.ts'
import { htmlCollection } from '@db'
import { id } from '@types'
import { html_cache_validator } from '@validators/html_cache.ts'

describe('Model cache', () => {
  const url = new URL('http://localhost/test_url')
  const html = 'example html string'

  afterEach(async () => {
    try {
      // Try to delete any records where their url is equal to the url used for testing
      const testRecord = await htmlCollection.getFirstListItem(`url='${url}'`)
      await deleteHTML(testRecord.id as id)
    } catch (_) {
      _
    }
  })

  it('throws on multiple with same url', async () => {
    await createHTML(url, 'asd')

    await assertRejects(async () => {
      await createHTML(url, 'fgh')
    })
  })

  it('can crete new records', async () => {
    await createHTML(url, html)
  })

  it('can can return records', async () => {
    await createHTML(url, html)
    const result = await getHTML(url)

    html_cache_validator.parse(result)
  })

  it('can delete records', async () => {
    const id = await createHTML(url, html)
    await deleteHTML(id as id)
  })
})
