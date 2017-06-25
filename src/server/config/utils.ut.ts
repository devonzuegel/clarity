import * as U from './utils'

describe('demand', () => {
  it('throws an error when the provided object does not have the key', () => {
    const k = 'key-that-doesnt-exist'
    expect(() => U.demand({}, k)).toThrow(
      `Demand Unfufilled: Environment variable "${k}" is not defined.`
    )
  })
  it('returns value corresponding to the key', () => {
    const k = 'baz'
    expect(U.demand({[k]: 'foobar'}, k)).toEqual('foobar')
  })
})

describe('getValueSource', () => {
  const processEnv = {process: 'env'}
  const dotEnvSuccess = {parsed: {dot: 'env'}}
  const dotEnvFailure = {error: {path: '/nonexistent/path'}}

  it('gives processEnv when dotEnv has an error', () => {
    expect(U.getValueSource(dotEnvFailure, processEnv)).toEqual(processEnv)
  })

  it('returns an error-free processEnv', () => {
    expect(U.getValueSource(dotEnvSuccess, processEnv)).toEqual(dotEnvSuccess.parsed)
  })
})
