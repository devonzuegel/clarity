import * as React from 'react'
import * as R from 'ramda'
import {graphql} from '~/../utils/api/responses'
import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'
import NotFound from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

interface IIteration {title: string; body: string; createdAt: string}
interface IPost {id: number; iterations: IIteration[]}
interface IUser {posts: IPost[]}

interface IState {
  posts?: IPost[]
  error?: string
  loading: boolean
}

const NoPosts = ({username}: {username: string}) =>
  <div id="not-found" className="pt-non-ideal-state" style={{maxHeight: '45%'}}>
    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
      <span className="pt-icon pt-icon-moon" />
    </div>
    <h4 className="pt-non-ideal-state-title">
      No posts to display
    </h4>
    <div className="pt-non-ideal-state-description">
      <b>{username}</b> hasn't published anything yet!
    </div>
  </div>

const Post = (post: IPost, i: number) => {
  const lastIteration = R.last(post.iterations)
  return (
    <div key={i}>
      {post.id !== 0 && <br />}
      <h4 className="post-list--post-title">
        <a href={urls.post(post.id)}>
          {lastIteration.title}
        </a>
      </h4>
      <label className="pt-text-muted">
        {formatDateLong(lastIteration.createdAt)}
      </label>
      <br />
    </div>
  )
}

class ShowUser extends React.Component<{username: string}, IState> {
  state = {posts: undefined, error: undefined, loading: true}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveData() {
    graphql(
      `{users(username:"${this.props.username}") {
          posts {id, iterations {title,body,createdAt}}
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
    const noPosts = !(this.state.posts && (this.state.posts || []).length > 0)
    return (
      <div>
        <h1>
          Writing
        </h1>
        <br />
        <div id="posts-list">
          {noPosts
            ? <NoPosts username={this.props.username} />
            : (this.state.posts || []).map(Post)}
        </div>
      </div>
    )
  }
}

export default ShowUser
