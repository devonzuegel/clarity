/**
 * This SimpleMDE React wrapper was adapted from `react-simplemde-v1`:
 *   github.com/xlsdg/react-simplemde-v1
 *
 * SimpleMDE documentation can be found here:
 *   github.com/sparksuite/simplemde-markdown-editor
 */

import * as React    from 'react'
import * as ReactDOM from 'react-dom'


const styles    = require('./styles.css')
const SimpleMDE = require('./SimpleMDE.js')


const toolbar = [
  'strikethrough',
  'heading',
  'code',
  'table',
  '|',
  'preview',
  'side-by-side',
  'fullscreen',
  'guide',
]

type IMarkdownEditorProps = {
  onChange: (s: string) => void,
  options: {
    initialValue: string,
    placeholder: string,
  },
}

const reducers = {
  updateContent: (value: string) => () => ({value}),
}

class MarkdownEditor extends React.Component<IMarkdownEditorProps, any> {
  state = {
    instance: null, // When the SimpleMDE component mounts, it is stored here.
    value: this.props.options.initialValue,
  }

  componentDidMount () {
    if (!this.state.instance) {
      const instance = new SimpleMDE({
        ...this.props.options,
        toolbar,
        element:      ReactDOM.findDOMNode(this),
        autofocus:    true,
        spellChecker: false,
      })
      instance.codemirror.on('change', () => {
        const value: string = instance.value()
        this.props.onChange(value)
        this.setState(reducers.updateContent(value))
      })
      this.setState({instance})
    }
  }
  shouldComponentUpdate(_nextProps: IMarkdownEditorProps) {
    return false
    /**
     * Note that the value in the textarea is not passed as a prop from the parent as
     * is typical in a React architecture. (The `initialValue` is passed as a prop in
     * this way, but it is not updated.) Rather, the parent's state can be updated with
     * the onChange function passed in here.
     *
     * This is slightly less clean, but to do it the "correct" way would result in a
     * performance hit and greater complication of the wrapper implementation. The
     * textarea already knows its value, so having the parent update state, pass the
     * new value to the child, and then have the instance call the `instance.value(x)`
     * setter is just a whole bunch more work for the component to do for the some result.
     * So instead, we just never want the component to update.
     *
     * If this does become a problem later on, we can replace the `return false` with:
     * => return !R.equals(nextProps.options, this.props.options)
     */
  }
  render() {
    return <textarea />
  }
}

const Dependencies = () => (
  <div>
    <link
      rel ='stylesheet'
      href='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'
    />
    <link
      rel ='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/mode/markdown/markdown.min.js'
    />
    <link
      rel ='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/addon/fold/markdown-fold.min.js'
    />
    <script
      type='type/javascript'
      src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/addon/fold/foldcode.min.js'
     />
    <script
      type='type/javascript'
      src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/addon/fold/foldgutter.min.js'
     />
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/addon/fold/foldgutter.min.css'
    />
  </div>
)

export default (props: IMarkdownEditorProps) => (
  <div className={`${styles.markdownEditor} markdownEditor-global`}>
    <Dependencies />
    <MarkdownEditor {...props} />
  </div>
)
