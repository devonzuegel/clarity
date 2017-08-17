import * as Immutable from 'immutable'
import * as React from 'react'
import * as D from 'draft-js'

import TodoBlock from './TodoBlock2'

const BLOCK_TYPES = {
  TODO: 'todo',
}

// const TodoBlock = () => <div>asfkljasdlkfj</div> // TODO

const getBlockRendererFn = (getEditorState: Function, onChange: Function) => (
  block: D.ContentBlock
) => {
  const type = block.getType()
  switch (type) {
    case BLOCK_TYPES.TODO:
      return {
        component: TodoBlock,
        props: {
          getEditorState,
          onChange,
        },
      }
    default:
      return null
  }
}

class MyTodoListEditor extends React.Component<{}, {editorState: D.EditorState}> {
  state = {editorState: D.EditorState.createEmpty()}

  blockRenderMap = Immutable.Map({
    [BLOCK_TYPES.TODO]: {element: 'div'},
  }).merge(D.DefaultDraftBlockRenderMap) as Immutable.Map<any, any>

  blockStyleFn(block: D.ContentBlock) {
    switch (block.getType()) {
      case BLOCK_TYPES.TODO:
        return 'block block-todo'
      default:
        return 'block'
    }
  }

  getEditorState = () => this.state.editorState

  onChange = (editorState: D.EditorState) => this.setState({editorState})

  render() {
    return (
      <D.Editor
        blockRenderMap={this.blockRenderMap}
        blockStyleFn={this.blockStyleFn}
        blockRendererFn={getBlockRendererFn(this.getEditorState, this.onChange)}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}

export default MyTodoListEditor
