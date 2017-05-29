import * as React from 'react'

import MarkdownEditor from '~/frontend/components/MarkdownEditor'

class Me extends React.Component<{}, {text: string}> {
  initialState = {text: 'hello'}
  state        = this.initialState

  render () {
    return (
      <div style={{height: '20%'}}>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
        <MarkdownEditor
          options={{initialValue: this.initialState.text}}
          onChange={(text: string) => this.setState({text})}
        />
      </div>
    )
  }
}

export default Me
