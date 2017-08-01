import * as React from 'react'
import * as R from 'ramda'
import {graphql} from '~/../utils/api/responses'
import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'
import NotFound from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

interface IIteration {title: string; body: string; createdAt: string}
interface IPost {id: number; iterations: IIteration[]}

interface IState {
  posts?: IPost[]
  error?: string
  loading: boolean
}

const NoPosts = () =>
  <div id="not-found" className="pt-non-ideal-state" style={{maxHeight: '45%'}}>
    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
      <span className="pt-icon pt-icon-moon" />
    </div>
    <h4 className="pt-non-ideal-state-title">
      No posts to display
    </h4>
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
    const noPosts = !(this.state.posts && (this.state.posts || []).length > 0)
    return (
      <div id="home--posts-list">
        {noPosts ? <NoPosts /> : (this.state.posts || []).map(Post)}
      </div>
    )
  }
}

export default ShowUser
