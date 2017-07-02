import * as Facebook from 'passport-facebook'

export const id = 'xxxxxxxxxxxxxxxx'
export const displayName = 'Mock User'
const profileMock: Facebook.Profile = {
  id,
  displayName,
  provider: 'facebook',
  _raw: `{"name":"${displayName}","id":"${id}"}`,
  _json: {name: displayName, id},
}

export default profileMock
