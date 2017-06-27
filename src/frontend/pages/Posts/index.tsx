import * as React from 'react'

import Hermes from '~/../utils/hermes'
import * as U from '~/../utils/date'

import {PostSchema} from '~/server/db/models/post'
import {IterationSchema} from '~/server/db/models/iteration'
import {UserAttributes} from '~/server/db/models/user'

import {urls} from '~/frontend/routes'
import * as api from '~/frontend/api'

const logger = new Hermes({name: 'frontend'})

interface IPost extends PostSchema {
  iterations?: IterationSchema[]
  userName?: string
}

interface IState {
  posts?: IPost[]
}

const reducers = {
  updatePostsList: (posts: PostSchema[]) => (_: IState) => ({
    posts,
  }),

  addIterations: (iPost: number, iterations: IterationSchema[]) => (
    prevState: IState
  ) => {
    let posts = prevState.posts
    if (!posts) {
      return prevState
    }
    posts[iPost].iterations = iterations
    return {posts}
  },

  addUserName: (iPost: number, userName: string) => (prevState: IState) => {
    let posts = prevState.posts
    if (!posts) {
      return prevState
    }
    posts[iPost].userName = userName
    return {posts}
  },
}

const Post = (post: IPost, k: number) => {
  if (!post.iterations) return null

  const lastIteration = post.iterations[post.iterations.length - 1]
  const separator = '\u00a0 • \u00a0'
  return (
    <div key={k}>
      {post.id !== 0 && <br />}
      <h4 className="post-list--post-title">
        <a href={urls.post(post.id)}>
          {lastIteration.title}
        </a>
      </h4>
      <label className="pt-text-muted">
        {post.userName}
        {separator}
        {U.formatDateStr(lastIteration.createdAt)}
      </label>
      <br />
    </div>
  )
}

class Posts extends React.Component<{}, IState> {
  state = {posts: undefined}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveIterations = async (p: PostSchema, i: number) => {
    const iterations: IterationSchema[] = await api.getIterations(p.id)
    this.setState(reducers.addIterations(i, iterations))
  }

  retrieveUserName = async (p: PostSchema, i: number) => {
    try {
      const user: UserAttributes = await api.getUser(p.userId)
      this.setState(reducers.addUserName(i, user.facebookId))
    } catch (e) {
      console.error(e)
    }
  }

  async retrieveData() {
    try {
      const posts = await api.getPosts()
      this.setState(reducers.updatePostsList(posts))
      posts.map(this.retrieveIterations)
      posts.map(this.retrieveUserName)
    } catch (e) {
      logger.warn(e)
    }
  }

  render() {
    return (
      <div id="posts-list">
        <h3>
          All posts
        </h3>
        {this.state.posts
          ? (this.state.posts || []).map(Post)
          : 'Retrieving posts...'}
      </div>
    )
  }
}

export default Posts
