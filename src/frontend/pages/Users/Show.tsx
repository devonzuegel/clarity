import * as React from 'react'
import * as R from 'ramda'
import * as marked from 'marked'
import * as classnames from 'classnames'

import {graphql} from '~/../utils/api/responses'
import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'

interface IError {
  message: string
}

interface IIteration {title: string; body: string; createdAt: string}
interface IPost {id: number; iterations: IIteration[]}
interface IUser {posts: IPost[]}

interface IState {
  posts?: IPost[]
  errors?: IError[]
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
        <div dangerouslySetInnerHTML={{__html: marked(mostRecentIteration.body)}} />
      </div>
    </a>
  )
}

const Message = (props: {errors: IError[]}) =>
  <div>
    {props.errors.map(({message}: IError, i) =>
      <ErrorMessage msg={message} key={i} id={`me-error-${i}`} />
    )}
  </div>

class ShowUser extends React.Component<{facebookId: string}, IState> {
  state = {posts: undefined, errors: undefined}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveData() {
    graphql(
      `{users(facebookId:"${this.props.facebookId}") {
          posts {id, iterations {title,body,createdAt}}
        }}`
    )
      .then((result: {data: {users: IUser[]}}) => {
        if (result.data.users.length === 0) {
          // TODO: Use NotFound page instead
          this.setState({errors: [{message: 'That user does not exist'}]})
        } else {
          const posts = result.data.users[0].posts
          this.setState({posts})
        }
      })
      .catch(e => this.setState({errors: e.errors}))
  }

  render() {
    return this.state.errors
      ? <Message errors={this.state.errors || []} />
      : <div>
          <h1>
            Writing
          </h1>
          <br />
          {this.state.posts && (this.state.posts || []).map(Post)}
        </div>
  }
}

export default ShowUser
