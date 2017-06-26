import * as Chalk from 'chalk'

import * as U from './date'

type TLocation = 'server' | 'frontend'
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

  formatName() {
    if (this.name === 'server') {
      return Chalk.bgBlue.white(` ${this.name} `)
    }
    if (this.name === 'frontend') {
      return Chalk.bgYellow.black(` ${this.name} `)
    }
    throw Error(`Name must be one of "server" or "frontend"`)
  }

  debug(s: string): ILogObject {
    const date = new Date()
    const formattedDate = U.formatDate(date)
    const dateString = Chalk.bgBlack(` ${formattedDate} `)
    const log = `${dateString}${this.formatName()} ${s}`
    if (!this.silent) {
      console.log(log)
    }
    return {
      date,
      log,
      formattedDate,
      name: this.name,
      silent: this.silent,
    }
  }
}

export default Hermes
