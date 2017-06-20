import * as React from 'react'
import * as classnames from 'classnames'
import * as JsDiff from 'diff'

const s = require('./styles.css')

interface IDiffProps {
  old: string
  new: string
}

class Diff extends React.Component<IDiffProps, any> {
  render() {
    const diff = JsDiff.diffWords(this.props.old, this.props.new)
    const classes = ({removed, added}: JsDiff.IDiffResult) =>
      classnames({
        [s['chunk']]: true,
        [s['removed']]: removed,
        [s['added']]: added,
      })

    return (
      <div>
        {diff.map((chunk: JsDiff.IDiffResult, i: number) =>
          <div key={i} className={classes(chunk)}>
            {chunk.value}
          </div>
        )}
      </div>
    )
  }
}

export default Diff
