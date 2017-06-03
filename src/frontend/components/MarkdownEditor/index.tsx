/**
 * This SimpleMDE React wrapper was adapted from `react-simplemde-v1`:
 *   github.com/xlsdg/react-simplemde-v1
 *
 * SimpleMDE documentation can be found here:
 *   github.com/sparksuite/simplemde-markdown-editor
 */

import * as React    from 'react'
import * as ReactDOM from 'react-dom'


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
  options: Object,
  onChange: (s: string) => void,
}

class MarkdownEditor extends React.Component<IMarkdownEditorProps, any> {
  state = {instance: null}

  componentDidMount () {
    if (!this.state.instance) {
      const instance = new SimpleMDE({
        ...this.props.options,
        toolbar,
        element:      ReactDOM.findDOMNode(this),
        autofocus:    true,
        spellChecker: false,
      })
      instance.codemirror.on('change', () => this.props.onChange(instance.value()))
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
    <style>
      {`
        .CodeMirror {
          max-height: 400px !important;
        }
        .CodeMirror-line {
          box-shadow: none;
        }
        .cm-formatting {
          opacity: 0.35;
        }
      `}
    </style>
    <link
      rel ='stylesheet'
      href='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'
    />
    <script src='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js'/>
  </div>
)

export default (props: IMarkdownEditorProps) => (
  <div>
    <Dependencies />
    <MarkdownEditor {...props} />
  </div>
)
