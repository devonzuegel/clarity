import * as React from 'react'
import * as Immutable from 'immutable'
import * as D from 'draft-js'

const DraftJSEditor = require('draft-js-plugins-editor').default
import TodoBlock from './TodoBlock'

const TYPES = {TODO: 'todo', UNSTYLED: 'unstyled'}

const changeCurrentBlockType = (
  editorState: D.EditorState,
  newType = TYPES.UNSTYLED
) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  // const block = blockMap.get(key)
  // const text = block.getText()
  // if (block.getLength() >= 2) {
  //   newText = text.substr(1)
  // }
  console.log(newType)
  const newBlock = new D.ContentBlock({
    key: D.genKey(),
    type: 'todo',
    text: 'asldkfjadlskfj',
    data: {checked: false}, // TODO: default data
  })
  // block.merge({
  //   // type: newType,
  //   data: {checked: false}, // TODO: default data
  // }) as D.ContentBlock
  const newContentState = contentState.merge({
    // blockMap: blockMap.set(key, block),
    blockMap: blockMap.set(key, newBlock),
    // selectionAfter: selectionState.merge({
    //   anchorOffset: 0,
    //   focusOffset: 0,
    // }),
  }) as D.ContentState
  console.log(contentState)
  console.log(newContentState)
  console.log(newBlock)
  return D.EditorState.push(editorState, newContentState, 'change-block-type')
}

// const changeCurrentBlockType = (
//   editorState: D.EditorState,
//   type: string,
//   text: string
// ) => {
//   // // const data = block.getData()
//   // const newBlock = block.merge({type, text}) as D.ContentBlock
//   // const newSelection = selection.merge({
//   //   anchorOffset: 0,
//   //   focusOffset: 0,
//   // })
//   // console.log(newBlock)
//   // console.log(newSelection)
//   // const newContentState = currentContent.merge(
//   //   {
//   //     // blockMap: blockMap.set(key, newBlock),
//   //     // selectionAfter: newSelection,
//   //   }
//   // ) as D.ContentState
//   // console.log(newContentState)

//   // // return D.EditorState.push(editorState, currentContent, 'change-block-type')
//   // return D.EditorState.push(editorState, newContentState, 'change-block-type')
// }

const handleBlockType = (editorState: D.EditorState, _character: string) => {
  // const currentSelection = editorState.getSelection()
  // const key = currentSelection.getStartKey()
  // const text = editorState.getCurrentContent().getBlockForKey(key).getText()
  // const position = currentSelection.getAnchorOffset()
  // const line = [text.slice(0, position), character, text.slice(position)].join('')
  // const blockType = D.RichUtils.getCurrentBlockType(editorState);

  return changeCurrentBlockType(editorState, TYPES.TODO)
}

const devonsPlugin = () => {
  type TStore = {[key: string]: undefined | Function}
  const store: TStore = {
    setEditorState: undefined,
    getEditorState: undefined,
  }
  return {
    store,
    initialize({setEditorState, getEditorState}: TStore) {
      store.setEditorState = setEditorState
      store.getEditorState = getEditorState
    },
    blockRendererFn: (block: D.ContentBlock) => {
      const type = block.getType()
      console.log(type)
      switch (type) {
        case TYPES.TODO:
          return {
            component: TodoBlock,
            props: store,
          }
        default:
          return null
      }
    },
    handleBeforeInput(
      ch: any,
      editorState: D.EditorState,
      {setEditorState}: {setEditorState: Function}
    ) {
      if (ch !== ']') return 'not-handled'
      const newEditorState = handleBlockType(editorState, ch)
      if (editorState !== newEditorState) {
        setEditorState(newEditorState)
        return 'handled'
      }
      return 'not-handled'
    },
  }
}

const plugins = [devonsPlugin()]

class Editor extends React.Component<{}, {editorState: D.EditorState}> {
  state = {
    editorState: D.EditorState.createEmpty(),
  }

  onChange = (editorState: any) => {
    // TODO
    this.setState({
      editorState,
    })
  }

  render() {
    return (
      <DraftJSEditor
        editorState={this.state.editorState}
        blockRenderMap={Immutable.Map({
          [TYPES.UNSTYLED]: {
            element: 'div',
          },
          [TYPES.TODO]: {
            element: 'div', // or whatever element you want as a wrapper
          },
        })}
        onChange={this.onChange}
        plugins={plugins}
      />
    )
  }
}

export default Editor
