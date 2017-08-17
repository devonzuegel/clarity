import * as Immutable from 'immutable'
import * as React from 'react'
import * as D from 'draft-js'

import TodoBlock from './TodoBlock2'

const BLOCK_TYPES = {
  TODO: 'todo',
}

type DraftHandleValue = 'handled' | 'not-handled'

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

  handleBeforeInput = (str: string): DraftHandleValue => {
    if (str === ']') {
      const editorState = this.state.editorState
      const selection = editorState.getSelection()
      const currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
      const blockType = currentBlock.getType()
      const blockLength = currentBlock.getLength()
      if (blockLength === 1 && currentBlock.getText() === '[') {
        console.log(`${blockType} => ${BLOCK_TYPES.TODO}`)
        // this.onChange(resetBlockType(editorState, blockType !== TODO_TYPE ? TODO_TYPE : 'unstyled'));
        // return true;
      }
    }
    return 'not-handled'
  }

  render() {
    return (
      <D.Editor
        blockRenderMap={this.blockRenderMap}
        blockStyleFn={this.blockStyleFn}
        blockRendererFn={getBlockRendererFn(this.getEditorState, this.onChange)}
        handleBeforeInput={this.handleBeforeInput}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}

export default MyTodoListEditor
