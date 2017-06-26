import * as React from 'react'
import * as classnames from 'classnames'

const s = require('./styles.css')

export default (props: {onClick: () => void; isSelected: boolean}) => {
  const classes = classnames({
    [s['container']]: true,
    [s['is-selected']]: props.isSelected,
  })
  return (
    <div className={classes} onClick={props.onClick}>
      <div className={s['spacer']} />
    </div>
  )
}
