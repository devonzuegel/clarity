import * as React from 'react'

import {get, sendRequest} from '../../../utils/api/responses'
import {PostAttributes} from '../../server/db/models/post'

import Layout from '~/frontend/stories/Layout'

interface IState {posts?: Object[]}

const updatePostsList = (posts: PostAttributes[]) => (_: IState) => ({posts})

class Me extends React.Component<{}, IState> {
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
