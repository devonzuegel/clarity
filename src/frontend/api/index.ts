import {post, get, sendRequest} from '../../../utils/api/responses'

export const getSession = sendRequest(get('/api/session'))

export const signupOrSignin = (action: 'signup'|'signin', username: string) =>
  sendRequest(post(`/api/${action}?username=${username}`))
