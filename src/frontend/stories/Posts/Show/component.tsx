import * as R from 'ramda'
import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'

import * as api from '~/frontend/api'
import Diff from '~/frontend/components/Diff'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

import {IState} from './IState'
import * as reducers from './reducers'
import Iteration from './Iteration'
import Edit from './Edit'
import History from './History'
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
      const iterations = await api.getIterations(this.props.postId)
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
    const historySelected = this.state.selected === iterations.length
    if (historySelected) return <History />

    if (Array.isArray(this.state.selected)) {
      const [i, j] = this.state.selected
      const body1 = (iterations[i] as IterationSchema).body
      const body2 = (iterations[j] as IterationSchema).body
      return <Diff old={body1 || ''} new={body2 || ''} />
    }

    if (!this.state.editing) {
      const selected = iterations[this.state.selected]
      return <Iteration {...selected || _dummy} />
    }

    const lastIteration = R.last(iterations) || _dummy
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
            <Timeline
              iterations={iterations}
              isSelected={(i): boolean => {
                console.log(`${this.state.selected}   ${i}`)
                return R.equals(this.state.selected, i)
              }}
              select={i => this.setState(reducers.select(i))}
              startRevision={setState(reducers.select(nIterations + 1, true))}
              viewHistory={setState(reducers.select(nIterations))}
              showDiff={(i1, i2) => setState(reducers.showDiff(i1, i2))}
            />
            {this.body()}
          </div>}
      </div>
    )
  }
}

export default Post
