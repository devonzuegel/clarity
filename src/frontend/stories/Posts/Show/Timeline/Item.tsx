import * as React from 'react'
import * as classnames from 'classnames'

const s = require('./styles.css')

type IItemProps = {
  id: string
  children?: any
  isSelected: Boolean
  onClick: () => void
  onMouseEnter?: () => void
  action?: Boolean
}

const Item = (props: IItemProps) => {
  const classes = classnames({
    [s['item']]: true,
    [s['item__action']]: !!props.action,
    [s['pt-button']]: !!props.action,
    [s['item__active']]: !!props.isSelected,
  })

  return (
    <div
      id={props.id}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      className={classes}
    >
      <span>
        {props.children}
      </span>
    </div>
  )
}

export default Item
