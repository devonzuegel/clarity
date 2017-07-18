import * as Facebook from 'passport-facebook'
import {randomStr} from '~/../utils/test/string'

const profileMock = (): Facebook.Profile => {
  const id = randomStr()
  const displayName = 'Mock User'

  return {
    id,
    displayName,
    provider: 'facebook',
    _raw: `{"name":"${displayName}","id":"${id}"}`,
    _json: {name: displayName, id},
  }
}

export default profileMock
