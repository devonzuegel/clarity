import * as React from 'react'

import * as api from '~/frontend/api'
import {IterationSchema} from '~/server/db/models/iteration'

interface IState {
  iterations?: IterationSchema[]
  selected?: number
}

const updatePostsList = (iterations: IterationSchema[]) => (_: IState) => ({
  iterations,
  selected: iterations.length - 1, // Last iteration
})

class Posts extends React.Component<{postId: number}, IState> {
  state = {
    iterations: undefined,
    selected:   undefined,
  }

  private Iteration = ({title, body, createdAt}: IterationSchema, k: number) => (
    <div key={k} className={`pt-card ${this.state.selected === k && 'pt-elevation-0'}`}>
      <h1>
        {title}
      </h1>
      <label>
        <i>
          {new Date(Date.parse(createdAt)).toLocaleString()}
        </i>
      </label>
      {body && body.split(`\n`).map((s, k) => <p key={k}>{s}</p>)}
    </div>
  )

   async componentWillMount () {
    try {
      const iterations: IterationSchema[] = await api.getIterations(this.props.postId)
      this.setState(updatePostsList(iterations))
    } catch (e) {
      console.warn(e)
    }
  }

  render () {
    return (
      <div>
        {
          this.state.iterations
          ? (this.state.iterations || []).map(this.Iteration)
          : 'Retrieving iterations...'
        }
      </div>
    )
  }
}

export default Posts

