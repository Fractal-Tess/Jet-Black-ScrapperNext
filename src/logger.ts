import * as path from 'https://deno.land/std@0.166.0/path/mod.ts'
import { IdentifierKind, IdentifierName, IdentifierType } from './types/scrapper.ts'

export class CustomLogger {
  logger
  constructor(idenKind: IdentifierKind, idenName: IdentifierName, idenType: IdentifierType) {
    const fUrl = path.fromFileUrl(new URL('.', import.meta.url).href)
    const logsDir = path.join(fUrl, `../logs/${idenKind}/${idenName}/${idenType}`)
    Deno.mkdirSync(logsDir, { recursive: true })

    console.log(logsDir)
    this.logger = ''
  }
}
