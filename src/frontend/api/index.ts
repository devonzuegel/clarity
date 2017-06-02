import {post, get, sendRequest}               from '~/../utils/api/responses'
import {PostSchema}                           from '~/server/db/models/post'
import {IterationSchema, IterationAttributes} from '~/server/db/models/iteration'


/** Session management **/

export const getSession = () =>
  sendRequest(get('/api/session'))

export const signupOrSignin = (action: 'signup'|'signin', username: string) =>
  sendRequest(post(`/api/${action}`, {username}))

export const signout = () =>
  sendRequest(post('/api/signout'))

/** Posts **/

export const getPosts = (): Promise<PostSchema[]> =>
  sendRequest(get('/api/posts'))

export const getIterations = (postId: number): Promise<IterationSchema[]> =>
  sendRequest(get(`/api/posts/${postId}`))

export const iterate = (postId: number, i: Partial<IterationAttributes>): Promise<IterationSchema> => {
  return sendRequest(post(`/api/posts/${postId}/iterate`, i))
}

type IPostDetails = {
  title: string,
  body?: string,
  username: string,
}

export const newPost = (details: IPostDetails): Promise<IterationSchema> => {
  return sendRequest(post(`/api/posts/create`, details))
}
