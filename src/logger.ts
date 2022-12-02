import { yellow, green, red, bold, log } from '@deps'

const msgFormatter = (log: log.LogRecord, msg: string) => {
  if (log.args.length != 0) {
    log.args.forEach(arg => {
      msg += `\n\t=> ${arg},`
    })
    msg = msg.slice(0, -1)
  }
  return msg
}

const fileFormatter = (log: log.LogRecord) => {
  const msg = `[${log.datetime.toJSON()}]:` + `[${log.levelName}]` + ` - ${log.msg}`
  return msgFormatter(log, msg)
}

const consoleFormatter = (log: log.LogRecord) => {
  const msg = `${log.levelName} ${log.msg}`
  return msgFormatter(log, msg)
}

class MyConsoleHandler extends log.handlers.BaseHandler {
  override format(logRecord: log.LogRecord): string {
    let msg = super.format(logRecord)
    switch (logRecord.level) {
      case log.LogLevels.INFO:
        msg = green(msg)
        break
      case log.LogLevels.WARNING:
        msg = yellow(msg)
        break
      case log.LogLevels.ERROR:
        msg = red(msg)
        break
      case log.LogLevels.CRITICAL:
        msg = bold(red(msg))
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

class MyFileHandler extends log.handlers.FileHandler {
  override handle(logRecord: log.LogRecord) {
    if (this.level > logRecord.level) return
    const msg = this.format(logRecord)
    this.log(msg)
    this.flush()
  }
}

export const initLog = async (logMode: 'overwrite' | 'append' = 'append') => {
  const mode = logMode === 'overwrite' ? 'w' : 'a'
  log.info(`Initializing logger with mode ${mode}`)
  const handlers = {
    genericLogger: new MyFileHandler('DEBUG', {
      formatter: fileFormatter,
      mode,
      filename: 'logs/generic/logs.log'
    }),

    httpLogger: new MyFileHandler('DEBUG', {
      formatter: fileFormatter,
      mode,
      filename: 'logs/http/http.log'
    }),

    performanceLogger: new MyFileHandler('DEBUG', {
      formatter: fileFormatter,
      mode,
      filename: 'logs/performance/performance.log'
    }),

    consoleLogger: new MyConsoleHandler('DEBUG', {
      formatter: consoleFormatter
    })
  }

  await log.setup({
    handlers,
    loggers: {
      default: {
        level: 'DEBUG',
        handlers: ['genericLogger', 'consoleLogger']
      },
      performanceLogger: {
        level: 'DEBUG',
        handlers: ['performanceLogger']
      },
      httpLogger: {
        level: 'DEBUG',
        handlers: ['httpLogger', 'consoleLogger']
      }
    }
  })
}
