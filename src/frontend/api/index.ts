import {post, get, sendRequest, buildQuery}   from '../../../utils/api/responses'
import {PostSchema}                           from '~/server/db/models/post'
import {IterationSchema, IterationAttributes} from '~/server/db/models/iteration'


/** Session management **/

export const getSession = () =>
  sendRequest(get('/api/session'))

export const signupOrSignin = (action: 'signup'|'signin', username: string) =>
  sendRequest(post(`/api/${action}?username=${username}`))

export const signout = () =>
  sendRequest(post('/api/signout'))

/** Posts **/

export const getPosts = (): Promise<PostSchema[]> =>
  sendRequest(get('/api/posts'))

export const getIterations = (postId: number): Promise<IterationSchema[]> =>
  sendRequest(get(`/api/posts/${postId}`))

export const iterate = ({postId, title, body}: IterationAttributes): Promise<IterationSchema> => {
  const query = buildQuery({title, body})
  return sendRequest(get(`/api/posts/${postId}/iterate${query}`))
}

type IPostDetails = {
  title: string,
  body?: string,
  username: string,
}

export const newPost = (details: IPostDetails): Promise<IterationSchema> => {
  const query = buildQuery(details)
  return sendRequest(post(`/api/posts/create${query}`))
}
