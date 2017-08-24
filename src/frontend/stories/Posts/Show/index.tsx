import * as R from 'ramda'
import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'
import {graphql} from '~/../utils/api/responses'

import Wrapper from '~/frontend/components/Wrapper'
import Diff from '~/frontend/components/Diff'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

import {IState} from './IState'
import * as reducers from './reducers'
import {IPost} from '~/frontend/components/Post'
import Iteration from './Iteration'
import Edit from './Edit'
import History from './History'
import Timeline from './Timeline'

export type IProps = {
  slug: string
  username: string
  readonly: boolean
}

export class Post extends React.Component<IProps, IState> {
  state = {
    loading: true,
    iterations: undefined,
    selected: 0,
    editing: false,
    errorMsg: undefined,
  }

  async componentWillMount() {
    try {
      const result: {data: {posts: IPost[]}} = await graphql(
        `{posts(slug:"${this.props.slug}") {
          id
          user{username}
          iterations {title,body,createdAt, postId}
        }}`
      )
      const nonexistentPost =
        result.data.posts.length === 0 ||
        result.data.posts[0].user.username !== this.props.username
      if (nonexistentPost) throw Error()

      const iterations = result.data.posts[0].iterations
      this.setState(reducers.updatePostsList(iterations))
    } catch (e) {
      this.setState(reducers.nonexistentPostError)
    }
    this.setState(reducers.stopLoading)
  }

  private iterations() {
    return this.state.iterations || []
  }

  private body() {
    const iterations = this.iterations()
    const historySelected = this.state.selected === iterations.length
    if (historySelected) return <Wrapper><History /></Wrapper>

    if (Array.isArray(this.state.selected)) {
      const [i, j] = this.state.selected
      const title1 = (iterations[i] as IterationSchema).title
      const title2 = (iterations[j] as IterationSchema).title
      const body1 = (iterations[i] as IterationSchema).body
      const body2 = (iterations[j] as IterationSchema).body
      return <Diff old={`# ${title1}\n\n${body1}`} new={`# ${title2}\n\n${body2}`} />
    }

    if (!this.state.editing) {
      const selected = iterations[this.state.selected]
      return <Wrapper><Iteration {...selected} /></Wrapper>
    }

    const lastIteration = R.last(iterations)
    return (
      <Edit
        iteration={lastIteration}
        addIteration={i => this.setState(reducers.addIteration(i))}
      />
    )
  }

  render() {
    if (this.state.loading) return <LoadingOverlay />

    const iterations = this.iterations()
    const nIterations = iterations.length
    const setState = (fn: (prev: IState) => IState) => () => this.setState(fn)

    return (
      <div>
        {this.state.errorMsg &&
          <div className="pt-callout pt-intent-danger">
            {this.state.errorMsg}
          </div>}
        {!this.state.errorMsg &&
          <div>
            {!this.props.readonly &&
              <Timeline
                iterations={iterations}
                isSelected={i => R.equals(this.state.selected, i)}
                select={i => this.setState(reducers.select(i, false))}
                startRevision={setState(reducers.select(nIterations + 1, true))}
                viewHistory={setState(reducers.select(nIterations, false))}
                showDiff={(i1, i2) => setState(reducers.showDiff(i1, i2))}
              />}
            {this.body()}
          </div>}
      </div>
    )
  }
}

export default Post
