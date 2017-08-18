import * as React from 'react'

import Markdown from '~/frontend/components/Markdown'
const styles = require('./styles.css')

interface IState {raw: string}

class Editor extends React.Component<{}, IState> {
  state = {raw: ''}

  render() {
    return (
      <div className={styles.panes}>
        <div className={styles.pane}>
          <textarea
            placeholder="Start writing!"
            className={styles.editor}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              this.setState({raw: e.currentTarget.value})}
            value={this.state.raw}
          />
        </div>

        <div className={styles.pane}>
          <Markdown text={this.state.raw} />
        </div>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/idea.min.css"
          rel="stylesheet"
        />
      </div>
    )
  }
}

export default Editor
