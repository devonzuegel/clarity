import {post, get, sendRequest} from '../../../utils/api/responses'
import {PostAttributes}         from '~/server/db/models/post'
import {IterationSchema}        from '~/server/db/models/iteration'

export const getSession = () =>
  sendRequest(get('/api/session'))

export const signupOrSignin = (action: 'signup'|'signin', username: string) =>
  sendRequest(post(`/api/${action}?username=${username}`))

export const getPosts = (): Promise<PostAttributes[]> =>
  sendRequest(get('/api/posts'))

export const getIterations = (postId: number): Promise<IterationSchema[]> =>
  sendRequest(get(`/api/posts/${postId}`))

export const signout = () =>
  sendRequest(post('/api/signout'))
