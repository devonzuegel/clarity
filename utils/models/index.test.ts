import * as U from './'

describe('Utils', () => {
  describe('strEnum', () => {
    it('builds a string enum', () => {
      const Enum = U.strEnum([
        'myfirstvalue',
        'mysecondvalue',
      ])
      expect(Enum.myfirstvalue).toEqual('myfirstvalue')
      expect(Enum.mysecondvalue).toEqual('mysecondvalue')
    })
  })
})

