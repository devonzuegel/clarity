import * as React from 'react'

import { Button, Tag } from '@blueprintjs/core'
import Grid from './Grid'

interface IState {
  count: number
}

const increment = (prevState: IState): IState => ({ count: prevState.count + 1 })
const decrement = (prevState: IState): IState => ({ count: prevState.count - 1 })

export default class Counter extends React.Component<null, IState> {
  state = {count: 0}

  btns = {
    increment: (
      <Button
        onClick  ={() => this.setState(increment)}
        id       ='increment-btn'
        iconName ='add'
        className='pt-minimal'
      >
        Increment
      </Button>
    ),
    decrement: (
      <Button
        onClick      ={() => this.setState(decrement)}
        id           ='decrement-btn'
        rightIconName='remove'
        className    ='pt-minimal'
      >
        Decrement
      </Button>
    ),
  }

  render () {
    return (
      <div>
        <h2>
          Devon's Toy Counter
        </h2>

        <Grid
          items={[
            this.btns.increment,
            <Tag id='count' className='pt-large'>
              {this.state.count}
            </Tag>,
            this.btns.decrement,
          ]}
        />
      </div>
    )
  }
}
