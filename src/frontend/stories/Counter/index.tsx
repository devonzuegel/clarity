import * as React from 'react'

import { Button } from '@blueprintjs/core'

interface IState {
  count: number
}

const increment = (prevState: IState): IState => ({ count: prevState.count + 1 })
const decrement = (prevState: IState): IState => ({ count: prevState.count - 1 })

export default class Counter extends React.Component<null, IState> {
  state = {count: 0}

  render() {
    return (
      <div>
        <h2>
          Devon's Toy Counter
        </h2>

        <Button
          onClick  ={() => this.setState(increment)}
          id       ='increment-btn'
          iconName ='add'
          intent   ='primary'
          className='pt-minimal'
        >
          Increment
        </Button>

        <b id='count'>
          {this.state.count}
        </b>

        <Button
          onClick      ={() => this.setState(decrement)}
          id           ='decrement-btn'
          rightIconName='add'
          className    ='pt-minimal'
        >
          Decrement
        </Button>
      </div>
    )
  }
}
