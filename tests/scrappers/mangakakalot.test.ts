import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts'

Deno.test('Testing simple math', () => {
  let s = 1 + 2
  assertEquals(s, 3)
})
