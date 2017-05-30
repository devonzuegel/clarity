import * as U from './date'

describe('formatDateStr', () => {
  it('handles invalid strings', () => {
    expect(() => {
      U.formatDateStr('Hello this is Devon')
    }).toThrow('Invalid Date')
  })
  it('handles valid date strings', () => {
    const examples = [
      ['June 11 2012',            '6/11/2012, 12:00:00 AM'],
      ['11 June 2012',            '6/11/2012, 12:00:00 AM'],
      ['2017-05-29 19:48:29.289', '5/29/2017, 7:48:29 PM' ],
    ]
    examples.map(([input, expected]: string[]) => {
      const output = U.formatDateStr(input)
      expect(output).toEqual(expected)
    })
  })
})

