import * as React from 'react'
import {graphql} from '~/../utils/api/responses'
import NotFound from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import {NoPosts} from '~/frontend/components/NoPosts'
import {Post, IPost} from '~/frontend/components/Post'

interface IState {
  posts?: IPost[]
  error?: string
  loading: boolean
}

class ShowUser extends React.Component<{}, IState> {
  state = {posts: undefined, error: undefined, loading: true}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveData() {
    graphql(
      `{posts {id, iterations {title,body,createdAt}}}`
    ).then((result: {data: {posts: IPost[]}}) => {
      const posts = result.data.posts
      this.setState({posts, loading: false})
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingOverlay />
    }
    if (this.state.error) {
      return <NotFound message={this.state.error} />
    }
    const posts = this.state.posts || []
    if (posts.length === 0) {
      return <NoPosts />
    }
    return (
      <div id="home--posts-list">
        {posts.map(Post)}
      </div>
    )
  }
}

export default ShowUser
