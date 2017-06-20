import {GuestInstance} from './guest'

describe('GuestInstance', () => {
  it('can be instantiated', () => {
    const g = new GuestInstance()
    expect(g instanceof GuestInstance).toEqual(true)
  })

  it('can be used as a type', () => {
    const g = new GuestInstance()
    const fn = (guest: GuestInstance) => guest
    fn(g)
  })
})
