import * as React from 'react'
import * as D from 'draft-js'

const updateDataOfBlock = (
  editorState: D.EditorState,
  block: D.ContentBlock,
  newData: Object
) => {
  const contentState = editorState.getCurrentContent()
  const newBlock = block.merge({data: newData}) as D.ContentBlock
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  }) as D.ContentState
  return D.EditorState.push(editorState, newContentState, 'change-block-type')
}

type TProps = {
  block: D.ContentBlock
  blockProps: {onChange: Function; getEditorState: Function}
}

class TodoBlock extends React.Component<TProps, {}> {
  constructor(props: TProps) {
    super(props)
    this.updateData = this.updateData.bind(this)
  }

  updateData() {
    const {block, blockProps} = this.props

    // This is the reason we needed a higher-order function for blockRendererFn
    const {onChange, getEditorState} = blockProps
    const data = block.getData()
    const checked = data.has('checked') && data.get('checked') === true
    const newData = data.set('checked', !checked)
    onChange(updateDataOfBlock(getEditorState(), block, newData))
  }

  render() {
    const data = this.props.block.getData()
    const checked = data.get('checked') === true
    return (
      <div className={checked ? 'block-todo-completed' : ''}>
        <input type="checkbox" checked={checked} onChange={this.updateData} />
        <D.EditorBlock {...this.props} />
      </div>
    )
  }
}

export default TodoBlock
