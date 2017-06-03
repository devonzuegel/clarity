import {buildQuery} from './responses'


describe('buildQuery', () => {
  it('builds a query', () => {
    const values   = {a: 123, b: 'mystring'}
    const expected = '?a=123&b=mystring'
    expect(buildQuery(values)).toEqual(expected)
  })

  it('ignores keys with undefined values', () => {
    const values   = {a: 123, b: undefined, c: null}
    const expected = '?a=123'
    expect(buildQuery(values)).toEqual(expected)
  })

  it('handles keys following a key with an undefined value', () => {
    const values   = {a: 123, b: undefined, c: 'xx'}
    const expected = '?a=123&c=xx'
    expect(buildQuery(values)).toEqual(expected)
  })
})
