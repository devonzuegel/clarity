import * as React from 'react'

import Hermes from '~/../utils/hermes'
import * as U from '~/../utils/date'
import {graphql} from '~/../utils/api/responses'

import {PostSchema} from '~/server/db/models/post'
import {IterationSchema} from '~/server/db/models/iteration'

import {urls} from '~/frontend/routes'

const logger = new Hermes({name: 'frontend'})

interface IPost extends PostSchema {
  iterations?: IterationSchema[]
  user: {facebookId: string; username: string}
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
        {post.user.username}
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

  async retrieveData() {
    try {
      const data: {posts: PostSchema[]} = (await graphql(
        `{posts{id,iterations{body,title,createdAt},user{facebookId,username}}}`
      )).data
      this.setState(reducers.updatePostsList(data.posts))
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
