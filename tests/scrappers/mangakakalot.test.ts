import { test } from '@deps'

Deno.test('Testing simple math', () => {
  let s = 1 + 2
  test.assertEquals(s, 3)
})
