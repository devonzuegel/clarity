import * as R from 'ramda'
import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'
import * as api from '~/frontend/api'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

import {IState} from './IState'
import * as reducers from './reducers'
import Iteration from './Iteration'
import Edit from './Edit'
import Timeline from './Timeline'

const _dummy = {
  // Force compiler to accept the selected iteration.
  createdAt: '',
  postId: -1,
  title: '',
}

export class Post extends React.Component<{postId: number}, IState> {
  state = {
    loading: true,
    iterations: undefined,
    selected: 0,
    editing: false,
    errorMsg: undefined,
  }

  async componentWillMount() {
    try {
      const iterations: IterationSchema[] = await api.getIterations(
        this.props.postId
      )
      if (iterations.length === 0) throw Error('No iterations')
      this.setState(reducers.updatePostsList(iterations))
    } catch (e) {
      this.setState(() => ({errorMsg: `Sorry! That post doesn't exist.`}))
    }
    this.setState(reducers.stopLoading)
  }

  private iterations() {
    return this.state.iterations || []
  }

  private body() {
    const iterations = this.iterations()

    if (!iterations) {
      return 'Retrieving iterations...'
    }

    if (this.state.selected === iterations.length) {
      return (
        <div>
          <h2>
            Creating history...
          </h2>
          <p>
            Come back later. :)
          </p>
        </div>
      )
    }

    if (!this.state.editing) {
      const selected = iterations[this.state.selected]
      return <Iteration {...selected || _dummy} />
    }

    const lastIteration = R.last(iterations) || _dummy
    return (
      <Edit
        iteration={lastIteration}
        addIteration={(i: IterationSchema) =>
          this.setState(reducers.addIteration(i))}
      />
    )
  }

  render() {
    if (this.state.loading) {
      return <LoadingOverlay />
    }
    const iterations = this.iterations()
    return (
      <div>
        {this.state.errorMsg &&
          <div className="pt-callout pt-intent-danger">
            {this.state.errorMsg}
          </div>}
        {!this.state.errorMsg &&
          <div>
            {iterations &&
              <Timeline
                iterations={iterations}
                isSelected={(i: number): Boolean => this.state.selected === i}
                select={(i: number) => this.setState(reducers.select(i))}
                startRevision={() =>
                  this.setState(reducers.select(iterations.length + 1, true))}
                viewHistory={() =>
                  this.setState(reducers.select(iterations.length))}
              />}
            {this.body()}
          </div>}
      </div>
    )
  }
}

export default Post
