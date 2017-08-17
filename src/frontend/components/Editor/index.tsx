import * as React from 'react'
import * as D from 'draft-js'

const DraftJSEditor = require('draft-js-plugins-editor').default
// const createMarkdownShortcutsPlugin = require('draft-js-markdown-shortcuts-plugin')
// .default

const changeCurrentBlockType = (
  editorState: D.EditorState,
  type: string,
  text: string,
  blockMetadata = {}
) => {
  const currentContent = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const key = selection.getStartKey()
  const blockMap = currentContent.getBlockMap()
  const block = blockMap.get(key)
  const data = block.getData().merge(blockMetadata)
  const newBlock = block.merge({type, data, text: text || ''}) as D.ContentBlock
  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: 0,
  })
  const newContentState = currentContent.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: newSelection,
  }) as D.ContentState
  return D.EditorState.push(editorState, newContentState, 'change-block-type')
}

class CustomBlock extends React.Component<
  {block: D.ContentBlock; contentState: D.ContentState; blockProps: {foo: string}},
  {}
> {
  render() {
    // const {block, contentState} = this.props
    const {foo} = this.props.blockProps
    // const data = contentState.getEntity(block.getEntityAt(0)).getData()
    return (
      <figure style={{height: '40px', width: '40px', border: '3px solid pink'}}>
        {JSON.stringify(foo, null, 2)}
        {/* {JSON.stringify(data, null, 2)} */}
      </figure>
    )
  }
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
      console.log({setEditorState, getEditorState})
      store.setEditorState = setEditorState
      store.getEditorState = getEditorState
    },
    blockRendererFn(block: D.ContentBlock) {
      const type = block.getType()
      console.log(type)
      if (type === 'header-one') {
        return {
          component: CustomBlock,

          props: {
            foo: 'bar',
          },
        }
      }
      return null
    },
    // blockStyleFn(block: D.ContentBlock) {
    //   console.log(block.getType())
    //   return 'xxxxxxxxxx'
    // },
    handleBeforeInput(
      character: any,
      editorState: D.EditorState,
      {setEditorState}: {setEditorState: Function}
    ) {
      if (character !== ' ') return 'not-handled'
      const currentSelection = editorState.getSelection()
      const key = currentSelection.getStartKey()
      const text = editorState.getCurrentContent().getBlockForKey(key).getText()
      const pos = currentSelection.getAnchorOffset()
      const line = [text.slice(0, pos), character, text.slice(pos)].join('')
      if (line.indexOf('#') === 0) {
        setEditorState(
          changeCurrentBlockType(
            editorState,
            'header-one',
            line.replace(/^#+\s+/, '')
          )
        )
        return 'handled'
      }
      const blockType = D.RichUtils.getCurrentBlockType(editorState)

      console.log(`"${line}" => ${blockType}`)
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
        onChange={this.onChange}
        plugins={plugins}
      />
    )
  }
}

export default Editor
