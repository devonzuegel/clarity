import * as React    from 'react'
import * as ReactDOM from 'react-dom'

interface IState {
  count: number
}

const increment = (prevState: IState): IState => ({ count: prevState.count + 1 })
const decrement = (prevState: IState): IState => ({ count: prevState.count - 1 })

class Counter extends React.Component<null, IState> {
  state = {count: 0}

  render() {
    return (
      <div>
        <button onClick={() => this.setState(increment)}>
          Increment
        </button>

        <b>
          {this.state.count}
        </b>

        <button onClick={() => this.setState(decrement)}>
          Decrement
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root'),
)
