import * as React      from 'react'
import * as classnames from 'classnames'

import {IterationSchema} from '~/server/db/models/iteration'

const s = require('./styles.css')

type IItemProps = {
  id:            string
  children?:     any,
  isSelected:    Boolean,
  onClick:       () => void,
  onMouseEnter?: () => void,
  action?:       Boolean,
}

const Item = (props: IItemProps) => {
  const classes = classnames({
    [s['item']]:         true,
    [s['item__action']]: !!props.action,
    [s['pt-button']]:    !!props.action,
    [s['item__active']]: !!props.isSelected,
  })

  return (
    <div
      id          ={props.id}
      onClick     ={props.onClick}
      onMouseEnter={props.onMouseEnter}
      className   ={classes}
    >
      <span>
        {props.children}
      </span>
    </div>
  )
}

type ITimelineProps = {
  iterations:    IterationSchema[],
  isSelected:    (i: number) => Boolean,
  select:        (i: number) => void,
  startRevision: ()          => void,
  viewHistory:   ()          => void,
}

const Timeline = (props: ITimelineProps) => (
  <div className={s['top-bar']}>
    <div className={s['timeline']}>
      <div className={s['timeline--line']} />
      {
        props.iterations.length > 1 &&
        props.iterations.map((_: IterationSchema, k: number) => [
          (
            k > 0 &&
            <div className={s['spacer']} />
          ),
          <Item
            id          ={`iteration-${k}`}
            onClick     ={() => props.select(k)}
            onMouseEnter={() => props.select(k)}
            isSelected  ={props.isSelected(k)}
            key         ={k}
          />,
        ])

      }
    </div>

    <div className={s['actions']}>
      <Item
        id        ='posts--show--history'
        onClick   ={props.viewHistory}
        isSelected={props.isSelected(props.iterations.length)}
        key       ={props.iterations.length}
        action
      >
        History
      </Item>

      <Item
        id        ='posts--show--iterate-btn'
        onClick   ={props.startRevision}
        isSelected={props.isSelected(props.iterations.length + 1)}
        key       ={props.iterations.length + 1}
        action
      >
        Revise
      </Item>
    </div>
  </div>
)

export default Timeline
