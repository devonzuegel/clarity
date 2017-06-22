import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'

import Spacer from './Spacer'
import Item from './Item'

const s = require('./styles.css')

type ITimelineProps = {
  iterations: IterationSchema[]
  isSelected: (i: number | number[]) => boolean
  select: (i: number) => void
  startRevision: () => void
  viewHistory: () => void
  showDiff: (i1: number, i2: number) => () => void
}

const Timeline = (props: ITimelineProps) => {
  const iterations = props.iterations

  const Iteration = (_: IterationSchema, k: number) => [
    k > 0 &&
      <Spacer
        onClick={props.showDiff(k - 1, k)}
        isSelected={props.isSelected([k - 1, k])}
      />,
    <Item
      id={`iteration-${k}`}
      onClick={() => props.select(k)}
      onMouseEnter={() => props.select(k)}
      isSelected={props.isSelected(k)}
      key={k}
    />,
  ]

  return (
    <div className={s['top-bar']}>
      <div className={s['timeline']}>
        <div className={s['timeline--line']} />
        {iterations.length > 1 && iterations.map(Iteration)}
      </div>

      <div className={s['actions']}>
        <Item
          id="posts--show--history"
          onClick={props.viewHistory}
          isSelected={props.isSelected(iterations.length)}
          key={iterations.length}
          action
        >
          History
        </Item>

        <Item
          id="posts--show--iterate-btn"
          onClick={props.startRevision}
          isSelected={props.isSelected(iterations.length + 1)}
          key={iterations.length + 1}
          action
        >
          Revise
        </Item>
      </div>
    </div>
  )
}

export default Timeline
