import * as React from 'react'

import {get, sendRequest} from '../../../utils/api/responses'
import {PostAttributes} from '../../server/db/models/post'

import Layout from '~/frontend/stories/Layout'

interface IState {posts?: Object[]}

class Me extends React.Component<{}, IState> {
  state = {posts: undefined}

  updatePostsList = (posts: PostAttributes[]) => (_: IState) => ({posts})

  componentWillMount () {
    sendRequest(get('/api/posts')).then((posts: PostAttributes[]) => {
      this.setState(this.updatePostsList(posts))
    })
  }

  render () {
    return (
      <Layout>
        <pre>
          {
            this.state.posts
            ? JSON.stringify(this.state.posts, null, 2)
            : 'Retrieving posts...'
          }
        </pre>
      </Layout>
    )
  }
}

export default Me
