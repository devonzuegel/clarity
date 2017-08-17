// import * as React from 'react'
// import * as Immutable from 'immutable'
// import * as D from 'draft-js'

// const TYPES = {TODO: 'todo', UNSTYLED: 'unstyled'}

// /*
// Returns default block-level metadata for various block type. Empty object otherwise.
// */
// const getDefaultBlockData = (blockType: string, initialData = {}) => {
//   switch (blockType) {
//     case TYPES.TODO:
//       return {checked: false}
//     default:
//       return initialData
//   }
// }

// /*
// Changes the block type of the current block.
// */
// const resetBlockType = (editorState: D.EditorState, newType = TYPES.UNSTYLED) => {
//   const contentState = editorState.getCurrentContent()
//   const selectionState = editorState.getSelection()
//   const key = selectionState.getStartKey()
//   const blockMap = contentState.getBlockMap()
//   const block = blockMap.get(key)
//   let newText = ''
//   const text = block.getText()
//   if (block.getLength() >= 2) {
//     newText = text.substr(1)
//   }
//   const newBlock = block.merge({
//     text: newText,
//     type: newType,
//     data: getDefaultBlockData(newType),
//   }) as D.ContentBlock
//   const newContentState = contentState.merge({
//     blockMap: blockMap.set(key, newBlock),
//     selectionAfter: selectionState.merge({
//       anchorOffset: 0,
//       focusOffset: 0,
//     }),
//   }) as D.ContentState
//   return D.EditorState.push(editorState, newContentState, 'change-block-type')
// }

// const updateDataOfBlock = (
//   editorState: D.EditorState,
//   block: D.ContentBlock,
//   newData: Object
// ) => {
//   const contentState = editorState.getCurrentContent()
//   const newBlock = block.merge({
//     data: newData,
//   }) as D.ContentBlock
//   const newContentState = contentState.merge({
//     blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
//   }) as D.ContentState
//   return D.EditorState.push(editorState, newContentState, 'change-block-type')
// }

// class TodoBlock extends React.Component<{}, {}> {
//   constructor(props) {
//     super(props)
//     this.updateData = this.updateData.bind(this)
//   }

//   updateData() {
//     const {block, blockProps} = this.props

//     // This is the reason we needed a higher-order function for blockRendererFn
//     const {onChange, getEditorState} = blockProps
//     const data = block.getData()
//     const checked = data.has('checked') && data.get('checked') === true
//     const newData = data.set('checked', !checked)
//     console.log(checked, 'upd')
//     onChange(updateDataOfBlock(getEditorState(), block, newData))
//   }

//   render() {
//     const data = this.props.block.getData()
//     const checked = data.get('checked') === true
//     return (
//       <div className={checked ? 'block-todo-completed' : ''}>
//         <input type="checkbox" checked={checked} onChange={this.updateData} />
//         <EditorBlock {...this.props} />
//       </div>
//     )
//   }
// }

// /*
// A higher-order function.
// */
// const getBlockRendererFn = (getEditorState, onChange) => block => {
//   const type = block.getType()
//   switch (type) {
//     case TODO_TYPE:
//       return {
//         component: TodoBlock,
//         props: {
//           onChange,
//           getEditorState,
//         },
//       }
//     default:
//       return null
//   }
// }

// class MyTodoListEditor extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       editorState: EditorState.createEmpty(),
//     }

//     this.blockRenderMap = Immutable.Map({
//       [TODO_TYPE]: {
//         element: 'div',
//       },
//     }).merge(DefaultDraftBlockRenderMap)

//     this.onChange = editorState => this.setState({editorState})

//     this.getEditorState = () => this.state.editorState

//     this.blockRendererFn = getBlockRendererFn(this.getEditorState, this.onChange)

//     this.handleBeforeInput = this.handleBeforeInput.bind(this)
//     this.handleKeyCommand = this.handleKeyCommand.bind(this)
//   }

//   componentDidMount() {
//     this.refs.editor.focus()
//   }

//   blockStyleFn(block) {
//     switch (block.getType()) {
//       case TODO_TYPE:
//         return 'block block-todo'
//       default:
//         return 'block'
//     }
//   }

//   handleBeforeInput(str) {
//     if (str !== ']') {
//       return false
//     }
//     const {editorState} = this.state
//     /* Get the selection */
//     const selection = editorState.getSelection()

//     /* Get the current block */
//     const currentBlock = editorState
//       .getCurrentContent()
//       .getBlockForKey(selection.getStartKey())
//     const blockType = currentBlock.getType()
//     const blockLength = currentBlock.getLength()
//     if (blockLength === 1 && currentBlock.getText() === '[') {
//       this.onChange(
//         resetBlockType(editorState, blockType !== TODO_TYPE ? TODO_TYPE : 'unstyled')
//       )
//       return true
//     }
//     return false
//   }

//   handleKeyCommand(command) {
//     const {editorState} = this.state
//     const newState = RichUtils.handleKeyCommand(editorState, command)
//     if (newState) {
//       this.onChange(newState)
//       return true
//     }
//     return false
//   }

//   render() {
//     return (
//       <Editor
//         ref="editor"
//         placeholder="Write here. Type [ ] to add a todo ..."
//         editorState={this.state.editorState}
//         onChange={this.onChange}
//         blockStyleFn={this.blockStyleFn}
//         blockRenderMap={this.blockRenderMap}
//         blockRendererFn={this.blockRendererFn}
//         handleBeforeInput={this.handleBeforeInput}
//         handleKeyCommand={this.handleKeyCommand}
//       />
//     )
//   }
// }

// export default MyTodoListEditor
