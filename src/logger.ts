import { Identifiers } from '@types'
import { log, colors, path, Subject } from '@deps'

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
  subject

  constructor(level: log.LevelName, identifier: Identifiers, subject: Subject<string>) {
    super(level)
    this.identifier = identifier
    this.subject = subject
  }

  override format(logRecord: log.LogRecord): string {
    let msg = `${logRecord.datetime.toISOString()} | ${logRecord.levelName} [${this.identifier.idenKind}] [${
      this.identifier.idenName
    }] {${this.identifier.idenType}} - ${logRecord.msg} ${stringifyArgs(logRecord.args).join('\n')}`

    this.subject.next(msg)

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

export const crateLogger = async (identifiers: Identifiers, subject: Subject<string>) => {
  const fUrl = path.fromFileUrl(new URL('.', import.meta.url).href)
  const logsDir = path.join(
    fUrl,
    `../logs/${identifiers.idenKind}/${identifiers.idenName}/${identifiers.idenType}`
  )
  Deno.mkdirSync(logsDir, { recursive: true })

  await log.setup({
    handlers: {
      // console: new ConsoleLogger('DEBUG', identifiers, subject),
      file_all: new FileLogger('DEBUG', {
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
