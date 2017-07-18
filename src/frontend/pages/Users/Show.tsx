import * as React from 'react'
import * as R from 'ramda'
import * as marked from 'marked'
import * as classnames from 'classnames'

import {graphql} from '~/../utils/api/responses'
import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'
import Truncated from '~/frontend/components/Truncated'
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

const Post = (post: IPost, i: number) => {
  const mostRecentIteration = R.last(post.iterations)
  const date = new Date(Date.parse(mostRecentIteration.createdAt))
  const classes = classnames({
    'pt-card': true,
    'pt-interactive': true,
  })
  return (
    <a
      href={urls.post(post.id)}
      key={i}
      style={{
        color: 'inherit',
        textDecoration: 'inherit',
      }}
    >
      <div className={classes} style={{marginBottom: '16px'}}>
        <h3>
          {mostRecentIteration.title}
        </h3>
        <label className="pt-label pt-text-muted">
          {formatDateLong(date)}
        </label>
        <Truncated>
          <div
            dangerouslySetInnerHTML={{__html: marked(mostRecentIteration.body)}}
          />
        </Truncated>
      </div>
    </a>
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
    return (
      <div>
        <h1>
          Writing
        </h1>
        <br />
        {this.state.posts && (this.state.posts || []).map(Post)}
      </div>
    )
  }
}

export default ShowUser
