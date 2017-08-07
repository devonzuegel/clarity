import * as React from 'react'
import {graphql} from '~/../utils/api/responses'
import NotFound from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import {NoPosts} from '~/frontend/components/NoPosts'
import {Post, IPost} from '~/frontend/components/Post'

interface IUser {posts: IPost[]}

interface IState {
  posts?: IPost[]
  error?: string
  loading: boolean
}

class ShowUser extends React.Component<{username: string}, IState> {
  state = {posts: undefined, error: undefined, loading: true}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveData() {
    graphql(
      `{users(username:"${this.props.username}") {
          posts {id, slug, iterations {title,body,createdAt}, user {username}}
        }}`
    ).then((result: {data: {users: IUser[]}}) => {
      if (result.data.users.length === 0) {
        this.setState({
          error: 'That user does not exist.',
          loading: false,
        })
      } else {
        const posts = result.data.users[0].posts
        this.setState({posts, loading: false})
      }
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
      <div>
        <h1>
          Writing
        </h1>
        <br />
        <div id="posts-list">
          {posts.map(Post)}
        </div>
      </div>
    )
  }
}

export default ShowUser
