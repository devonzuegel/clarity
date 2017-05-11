import * as React from 'react'

import {get, sendRequest} from '../../../utils/api/responses'

interface IIteration {
  title: string
  body?: string
  createdAt: string
}
interface IState {
  iterations?: IIteration[]
  selected?: number
}

const updatePostsList = (iterations: IIteration[]) => (_: IState) => ({
  iterations,
  selected: iterations.length - 1, // Last iteration
})

class Posts extends React.Component<{postId: number}, IState> {
  state = {
    iterations: undefined,
    selected:   undefined,
  }

  private Iteration = ({title, body, createdAt}: IIteration, k: number) => (
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
      const iterations: IIteration[] = await sendRequest(get(`/api/posts/${this.props.postId}`))
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

