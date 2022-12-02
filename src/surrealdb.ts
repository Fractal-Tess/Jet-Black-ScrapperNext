import Surreal from 'https://deno.land/x/surrealdb@v0.5.0/mod.ts'
import { getEnv } from './config.ts'

const db = new Surreal(`${getEnv('SURREAL_DB_URL')}/rpc`)

// Sign-in as a namespace, database, or root user
await db.signin({
  user: 'root',
  pass: 'root'
})

// Select a specific namespace / database
await db.use('test', 'test')

export { db }
