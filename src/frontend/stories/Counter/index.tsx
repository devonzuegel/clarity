import * as React from 'react'

interface IState {
  count: number
}

const increment = (prevState: IState): IState => ({ count: prevState.count + 1 })
const decrement = (prevState: IState): IState => ({ count: prevState.count - 1 })

export class Counter extends React.Component<null, IState> {
  state = {count: 0}

  render() {
    return (
      <div>
        <button onClick={() => this.setState(increment)} id='increment-btn'>
          Increment
        </button>

        <b id='count'>
          {this.state.count}
        </b>

        <button onClick={() => this.setState(decrement)} id='decrement-btn'>
          Decrement
        </button>
      </div>
    )
  }
}
