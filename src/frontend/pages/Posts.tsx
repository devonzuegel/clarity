import * as React from 'react'

import {get, sendRequest} from '../../../utils/api/responses'
import {PostAttributes} from '../../server/db/models/post'


interface IState {posts?: Object[]}

const updatePostsList = (posts: PostAttributes[]) => (_: IState) => ({posts})

const Post = ({id, ...otherProps}: {id: number}, k: number) => (
  <div key={k}>
    {id !== 0 && <br />}
    <a href={`/posts/${id}`}>
      Link to post #{id}
    </a>
    <pre style={{fontSize: '0.7em'}}>
      {JSON.stringify(otherProps, null, 2)}
    </pre>
  </div>
)

class Posts extends React.Component<{}, IState> {
  state = {posts: undefined}

   async componentWillMount () {
    try {
      const posts: PostAttributes[] = await sendRequest(get('/api/posts'))
      this.setState(updatePostsList(posts))
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

