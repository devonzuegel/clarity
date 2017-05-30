import * as React from 'react'

import * as U            from '~/../utils/date'
import {PostSchema}      from '~/server/db/models/post'
import {IterationSchema} from '~/server/db/models/iteration'
import {urls}            from '~/frontend/routes'
import * as api          from '~/frontend/api'

interface IPost extends PostSchema {
  iterations?: IterationSchema[]
}

interface IState {
  posts?: IPost[]
}

const reducers = {
  updatePostsList: (posts: PostSchema[]) => (_: IState) => ({
    posts,
  }),

  addIterations: (iPost: number, iterations: IterationSchema[]) => (prevState: IState) => {
    let posts = prevState.posts
    if (!posts) {
      return prevState
    }
    posts[iPost].iterations = iterations
    return {posts}
  },
}

const Post = ({id, iterations}: {id: number, iterations: {title: string, createdAt: string}[]}, k: number) => {
  if (!iterations) {
    return null
  }
  const lastIteration = iterations[iterations.length - 1]
  return (
    <div key={k}>
      {id !== 0 && <br />}
      <h4 className='post-list--post-title'>
        <a href={urls.post(id)}>
          {lastIteration.title}
        </a>
      </h4>
      <label className='pt-text-muted'>
        {U.formatDateStr(lastIteration.createdAt)}
      </label>
      <br />
    </div>
  )
}

class Posts extends React.Component<{}, IState> {
  state = {posts: undefined}

  componentWillMount () {
    this.retrieveData()
  }

  retrieveIterations = async (p: PostSchema, i: number) => {
    const iterations: IterationSchema[] = await api.getIterations(p.id)
    this.setState(reducers.addIterations(i, iterations))
  }

  async retrieveData () {
    try {
      const posts = await api.getPosts()
      this.setState(reducers.updatePostsList(posts))
      posts.map(this.retrieveIterations)
    } catch (e) {
      console.warn(e)
    }
  }

  render () {
    return (
      <div id='posts-list'>
        <h3>
          All posts
        </h3>
        {
          this.state.posts
          ? (this.state.posts || []).map(Post)
          : 'Retrieving posts...'
        }
      </div>
    )
  }
}

export default Posts

