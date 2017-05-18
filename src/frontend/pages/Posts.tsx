import * as React from 'react'

import {PostSchema} from '../../server/db/models/post'
import {IterationSchema} from '../../server/db/models/iteration'
import {urls} from '~/frontend/routes'
import * as api from '~/frontend/api'

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

const Post = ({id, ...otherProps}: {id: number}, k: number) => (
  <div key={k}>
    {id !== 0 && <br />}
    <a href={urls.post(id)}>
      Link to post #{id}
    </a>
    <pre style={{fontSize: '0.7em'}}>
      {JSON.stringify(otherProps, null, 2)}
    </pre>
  </div>
)

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
      <div>
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

