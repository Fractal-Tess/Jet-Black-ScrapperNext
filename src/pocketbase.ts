import { getEnv } from '@config'
import { PocketBase } from '@deps'

const pb = new PocketBase(getEnv('POCKETBASE_URL'))

await pb.admins.authWithPassword(getEnv('POCKETBASE_EMAIL'), getEnv('POCKETBASE_PASSWORD'))

pb.autoCancellation(false)

export const htmlCollection = pb.collection('html_cache')
