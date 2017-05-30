import * as U from './string'

describe('Utils', () => {
  describe('dasherize', () => {
    it('handles strings', () => {
      const examples = [
        ['Hello this is Devon', 'hello-this-is-devon'],
        ['FOOBAR',              'foobar'             ],
        ['hi!',                 'hi!'                ],
      ]
      examples.map(([input, expected]: string[]) => {
        const output = U.dasherize(input)
        expect(output).toEqual(expected)
      })
    })
  })
})

