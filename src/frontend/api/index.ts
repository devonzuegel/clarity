import {post, get, sendRequest} from '~/../utils/api/responses'
import {FacebookProfile} from '~/../utils/models/FacebookProfile'
import {PostSchema} from '~/server/db/models/post'
import {UserInstance, UserAttributes} from '~/server/db/models/user'
import {IterationSchema, IterationAttributes} from '~/server/db/models/iteration'

/** Session management **/

export const getUsers = (): Promise<UserInstance[]> => sendRequest(get('/api/users'))

export const getUser = (userId: number): Promise<UserAttributes> =>
  sendRequest(get(`/api/users/${userId}`))

export const getProfile = (): Promise<FacebookProfile> =>
  sendRequest(get('/api/profile'))

export const signout = () => sendRequest(get('/api/signout'))

/** Posts **/

export const getPosts = (): Promise<PostSchema[]> => sendRequest(get('/api/posts'))

export const getIterations = (postId: number): Promise<IterationSchema[]> =>
  sendRequest(get(`/api/posts/${postId}`))

export const iterate = (
  postId: number,
  i: Partial<IterationAttributes>
): Promise<IterationSchema> => {
  return sendRequest(post(`/api/posts/${postId}/iterate`, i))
}

type IPostDetails = {
  title: string
  body?: string
  facebookId: string
}

export const newPost = (details: IPostDetails): Promise<IterationSchema> => {
  return sendRequest(post(`/api/posts/create`, details))
}
