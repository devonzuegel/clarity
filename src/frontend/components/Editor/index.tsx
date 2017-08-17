import * as Immutable from 'immutable'
import * as React from 'react'
import * as D from 'draft-js'

import TodoBlock from './TodoBlock2'
const s = require('./styles.css')

const BLOCK_TYPES = {
  TODO: 'todo',
  UNSTYLED: 'unstyled',
}

type DraftHandleValue = 'handled' | 'not-handled'

const getDefaultBlockData = (blockType: string, initialData = {}) => {
  switch (blockType) {
    case BLOCK_TYPES.TODO:
      return {checked: false}
    default:
      return initialData
  }
}

/*
Changes the block type of the current block.
*/
const resetBlockType = (
  editorState: D.EditorState,
  newType = BLOCK_TYPES.UNSTYLED
) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  const block = blockMap.get(key)
  let newText = ''
  const text = block.getText()
  if (block.getLength() >= 2) {
    newText = text.substr(1)
  }
  const newBlock = block.merge({
    text: newText,
    type: newType,
    data: getDefaultBlockData(newType),
  }) as D.ContentBlock
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  }) as D.ContentState
  return D.EditorState.push(editorState, newContentState, 'change-block-type')
}

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
        return `${s['block']} ${s['block-todo']}`
      default:
        return s['block']
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
        this.onChange(
          resetBlockType(
            editorState,
            blockType !== BLOCK_TYPES.TODO ? BLOCK_TYPES.TODO : BLOCK_TYPES.UNSTYLED
          )
        )
        return 'handled'
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
