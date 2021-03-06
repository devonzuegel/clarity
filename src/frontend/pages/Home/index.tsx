import * as React from 'react'
import {graphql} from '~/../utils/api/responses'
import NotFound from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import {NoPosts} from '~/frontend/components/NoPosts'
import {Post, IPost} from '~/frontend/components/Post'
import Layout from '~/frontend/stories/Layout'
import Wrapper from '~/frontend/components/Wrapper'

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
      `{posts {
        id,
        slug,
        iterations {title,body,createdAt}
        user {username}
      }}`
    ).then((result: {data: {posts: IPost[]}}) => {
      const posts = result.data.posts
      this.setState({posts, loading: false})
    })
  }

  render() {
    const posts = this.state.posts || []

    if (this.state.loading) return <LoadingOverlay />
    if (this.state.error) return <NotFound message={this.state.error} />
    if (posts.length === 0) return <NoPosts />

    return (
      <Layout>
        <Wrapper>
          <div id="home--posts-list">
            {posts.map(Post)}
          </div>
        </Wrapper>
      </Layout>
    )
  }
}

export default ShowUser
