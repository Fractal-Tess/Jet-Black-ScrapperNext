import { log, colors, path, ReplaySubject } from '@deps'
import { getEnv } from '@config'

type LoggerIdentifier = {
  name?: 'gogoanime' | 'mangakakalot'
  type: 'anime' | 'manga' | 'html'
  kind: 'scrapper' | 'api' | 'model' | 'cache'
}

const stringifyArgs = (args?: unknown[]) => {
  if (args)
    return args.map(arg => {
      if (arg instanceof Error) {
        return `\n${arg.name}| Message: ${arg.message} \n${arg.stack} ${arg.cause}`
      }
    })
  return []
}

// @ts-ignore
class ConsoleLogger extends log.handlers.BaseHandler {
  identifier
  rpSubject

  constructor(level: log.LevelName, identifier: LoggerIdentifier, rpSubject?: ReplaySubject<string>) {
    super(level)
    this.identifier = identifier
    this.rpSubject = rpSubject
  }

  override format(logRecord: log.LogRecord): string {
    // maybe fix this abomination?
    let msg = `${logRecord.datetime.toISOString()} | ${logRecord.levelName} [${this.identifier.kind}] ${
      this.identifier.name ? `[${this.identifier.name}] ` : ''
    }{${this.identifier.type}} - ${logRecord.msg} ${stringifyArgs(logRecord.args).join('\n')}`

    this.rpSubject?.next(msg)

    switch (logRecord.level) {
      case log.LogLevels.INFO:
        msg = colors.green(msg)
        break
      case log.LogLevels.WARNING:
        msg = colors.yellow(msg)
        break
      case log.LogLevels.ERROR:
        msg = colors.red(msg)
        break
      case log.LogLevels.CRITICAL:
        msg = colors.bold(colors.red(msg))
        break
      default:
        break
    }

    return msg
  }
  override log(msg: string): void {
    console.log(msg)
  }
}
// @ts-ignore
class FileLogger extends log.handlers.FileHandler {
  override handle(logRecord: log.LogRecord) {
    if (this.level > logRecord.level) return
    const msg = this.format(logRecord)
    this.log(msg)
    this.flush()
  }
}

export const createLogger = async (identifier: LoggerIdentifier, subject?: ReplaySubject<string>) => {
  const fUrl = path.fromFileUrl(new URL('.', import.meta.url).href)
  const logsDir = path.join(
    fUrl,
    `../logs/${identifier.type}/${identifier.name ? `${identifier.name}/` : ''}${identifier.kind}`
  )
  Deno.mkdirSync(logsDir, { recursive: true })

  await log.setup({
    handlers: {
      console: new ConsoleLogger(getEnv('LOG_LEVEL'), identifier, subject),
      file_all: new FileLogger(getEnv('LOG_LEVEL'), {
        mode: 'a',
        filename: logsDir + '/logs.log'
      }),
      file_error: new FileLogger('ERROR', {
        mode: 'a',
        filename: logsDir + '/error.log'
      })
    },

    loggers: {
      default: {
        level: 'DEBUG',
        handlers: ['console', 'file_all', 'file_error']
      }
    }
  })

  return log.getLogger()
}
