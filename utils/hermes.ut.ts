import * as R from 'ramda'

import Hermes from './hermes'

const str = 'xyz abc'
const silent = false

describe('Hermes', () => {
  it('logs the name, date, & string', () => {
    const H = new Hermes({name: 'server', silent})
    const result = H.info(str)
    expect(R.keys(result)).toEqual(['date', 'log', 'formattedDate', 'name', 'silent'])
    expect(result.name).toEqual('server')
    expect(result.silent).toEqual(silent)
    expect(result.log).toContain('server')
    expect(result.log).toContain(str)
  })
  it('logs the name, date, & string', () => {
    const H = new Hermes({name: 'frontend', silent})
    const result = H.info(str)
    expect(R.keys(result)).toEqual(['date', 'log', 'formattedDate', 'name', 'silent'])
    expect(result.name).toEqual('frontend')
    expect(result.silent).toEqual(silent)
    expect(result.log).toContain(str)
  })
})
