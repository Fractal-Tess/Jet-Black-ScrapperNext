import { createLogger } from '@logger'
import { ReplaySubject } from '@deps'

export const rpSubject = new ReplaySubject<string>(50)
const logger = createLogger({
  kind: 'model',
  type: 'manga'
})
