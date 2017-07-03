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
      [new Date('May 1 2016'), '01-05-2016 00:00:00'],
      [new Date('Dec 31 2019'), '31-12-2019 00:00:00'],
    ]
    examples.map(([input, expected]: [Date, string]) => {
      const output = U.formatDate(input)
      expect(output).toEqual(expected)
    })
  })
})

describe('formatDateLong', () => {
  it('handles valid date strings', () => {
    const examples = [
      [new Date('May 1 2016'), '01 May 2016, 00:00'],
      [new Date('Dec 31 2019'), '31 Dec 2019, 00:00'],
    ]
    examples.map(([input, expected]: [Date, string]) => {
      const output = U.formatDateLong(input)
      expect(output).toEqual(expected)
    })
  })
})
