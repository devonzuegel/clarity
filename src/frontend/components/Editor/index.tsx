import * as React from 'react'

import Markdown from '~/frontend/components/Markdown'
import {Panes, Pane} from '~/frontend/components/Panes'
const styles = require('./styles.css')

interface IState {raw: string}

class Editor extends React.Component<{}, IState> {
  state = {raw: ''}

  render() {
    return (
      <Panes>
        <Pane>
          <textarea
            placeholder="Start writing!"
            className={styles.editor}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              this.setState({raw: e.currentTarget.value})}
            value={this.state.raw}
          />
        </Pane>

        <Pane>
          <Markdown text={this.state.raw} />
        </Pane>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/idea.min.css"
          rel="stylesheet"
        />
      </Panes>
    )
  }
}

export default Editor
