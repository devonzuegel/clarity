import * as U from './date'

describe('formatDateStr', () => {
  it('handles invalid strings', () => {
    expect(() => {
      U.formatDateStr('Hello this is Devon')
    }).toThrow('Invalid Date')
  })
  it('handles valid date strings', () => {
    const examples = [
      ['June 11 2012', '6/11/2012, 00:00:00'],
      ['11 June 2012', '6/11/2012, 00:00:00'],
      ['2017-05-29 19:48:29.289', '5/29/2017, 19:48:29'],
    ]
    examples.map(([input, expected]: string[]) => {
      const output = U.formatDateStr(input)
      expect(output).toEqual(expected)
    })
  })
})

describe('formatDate', () => {
  it('handles valid date strings', () => {
    const examples = [
      [new Date('May 1 2016'), '5/01/2016, 00:00:00'],
      [new Date('Dec 31 2019'), '12/31/2019, 00:00:00'],
    ]
    examples.map(([input, expected]: string[]) => {
      const output = U.formatDateStr(input)
      expect(output).toEqual(expected)
    })
  })
})
