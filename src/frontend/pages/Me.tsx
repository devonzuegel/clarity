import * as React from 'react'
import * as R from 'ramda'

import {graphql} from '~/../utils/api/responses'
import {formatDateLong} from '~/../utils/date'
import * as api from '~/frontend/api'
import {urls} from '~/frontend/routes'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {FacebookProfile} from '~/../utils/models/FacebookProfile'

interface IError {
  message: string
}

interface IIteration {title: string; body: string; createdAt: string}
interface IPost {id: number; iterations: IIteration[]}
interface IUser {posts: IPost[]}

interface IState {
  profile?: FacebookProfile
  posts?: IPost[]
  errors?: IError[]
}

const Post = (post: IPost, i: number) => {
  const mostRecentIteration = R.last(post.iterations)
  const date = new Date(Date.parse(mostRecentIteration.createdAt))
  return (
    <a
      href={urls.post(post.id)}
      key={i}
      style={{
        color: 'inherit',
        textDecoration: 'inherit',
      }}
    >
      <div className="pt-card pt-interactive" style={{marginBottom: '16px'}}>
        <h3>
          {mostRecentIteration.title}
        </h3>
        <label className="pt-label pt-text-muted">
          {formatDateLong(date)}
        </label>
        <div>
          {mostRecentIteration.body}
        </div>
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

class Me extends React.Component<{}, IState> {
  state = {profile: undefined, posts: undefined, errors: undefined}

  componentWillMount() {
    this.retrieveData()
  }

  retrieveData() {
    api
      .getProfile()
      .then(profile => {
        this.setState({profile})
        const facebookId = profile.id
        graphql(
          `{users(facebookId:"${facebookId}") {
            posts {id, iterations {title,body,createdAt}}
          }}`
        )
          .then((result: {data: {users: IUser[]}}) => {
            const posts = result.data.users[0].posts
            this.setState({posts})
          })
          .catch(e => this.setState({errors: e.errors}))
      })
      .catch(e => this.setState({errors: e}))
  }

  render() {
    return (
      <div>
        {this.state.errors && <Message errors={this.state.errors || []} />}
        <h1>
          Writing
        </h1>
        <br />
        {this.state.posts && (this.state.posts || []).map(Post)}
      </div>
    )
  }
}

export default Me
