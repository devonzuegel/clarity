import * as Chalk from 'chalk'

import * as U from './date'

type TLocation = 'server' | 'frontend'
type TColor = 'red' | 'blue' | 'white' | 'yellow'

interface IOptions {
  name: TLocation
  silent?: boolean
}

interface ILogObject {
  date: Date
  log: string
  formattedDate: string
  name: TLocation
  silent: boolean
}

class Hermes {
  name: TLocation
  silent: boolean

  constructor(options: IOptions) {
    const {name, silent} = options
    this.name = name
    this.silent = silent || false
  }

  private formatName() {
    if (this.name === 'server') {
      return Chalk.bgBlue.white(` ${this.name} `)
    }
    if (this.name === 'frontend') {
      return Chalk.bgYellow.black(` ${this.name} `)
    }
    throw Error(`Name must be one of "server" or "frontend"`)
  }

  private formatDate(date: Date) {
    return Chalk.bgBlack(` ${U.formatDate(date)} `)
  }

  private log(s: string, color: TColor = 'white'): ILogObject {
    const date = new Date()

    const log =
      `${this.name === 'server' ? this.formatDate(date) : ''}` +
      `${this.name === 'server' ? this.formatName() : ''}` +
      `${this.name === 'server' ? ' ' : ''}` + // Add space if metadata included
      Chalk[color](s)

    if (!this.silent) {
      if (this.name === 'server') {
        console.log(log)
      } else {
        console.log('%c' + log, 'background:' + color) // Handle colors differently for frontend
      }
    }

    return {
      date,
      log,
      formattedDate: this.formatDate(date),
      name: this.name,
      silent: this.silent,
    }
  }

  debug(s: string) {
    return this.log(`INFO: ${s}`, 'blue')
  }

  info(s: string) {
    return this.log(`INFO: ${s}`, 'white')
  }

  warn(s: string) {
    return this.log(`WARNING: ${s}`, 'yellow')
  }

  error(s: string) {
    return this.log(`ERROR: ${s}`, 'red')
  }

  print(s: string) {
    return console.log(s)
  }
}

export default Hermes
