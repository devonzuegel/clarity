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
      <pre className={s['diff']}>
        {diff.map((chunk: JsDiff.IDiffResult, i: number) => {
          const lines = chunk.value.split('\n')

          // Ignore empty chunks
          if (lines.every(line => line === '')) return

          return (
            <div key={i} className={classes(chunk)}>
              {lines.map((line, j) =>
                <span key={j}>
                  {j > 0 && <br />}
                  <span>
                    {line}
                  </span>
                </span>
              )}
            </div>
          )
        })}
      </pre>
    )
  }
}

export default Diff
