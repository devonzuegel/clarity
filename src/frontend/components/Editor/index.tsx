import * as React from 'react'
import * as D from 'draft-js'

class MyTodoListEditor extends React.Component<{}, {editorState: D.EditorState}> {
  state = {
    editorState: D.EditorState.createEmpty(),
  }

  onChange = (editorState: D.EditorState) => this.setState({editorState})

  render() {
    return <D.Editor editorState={this.state.editorState} onChange={this.onChange} />
  }
}

export default MyTodoListEditor
