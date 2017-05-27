import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'


type IItemProps = {
  children?:     any,
  isSelected:    Boolean,
  onClick:       () => void,
  onMouseEnter?: () => void,
  floatRight?:   Boolean,
}

const Item = (props: IItemProps) => (
  <button
    className   ={`pt-button ${props.isSelected ? 'pt-active' : ''}`}
    onClick     ={props.onClick}
    onMouseEnter={props.onMouseEnter}
    style       ={{
      float:       props.floatRight && 'right',
      marginRight: '8px',
      outline:     'none',
    }}
  >
    {props.children}
  </button>
)

type ITimelineProps = {
  iterations:    IterationSchema[],
  isSelected:    (i: number) => Boolean,
  select:        (i: number) => void,
  startRevision: ()          => void,
}

const Timeline = (props: ITimelineProps) => (
  <div>
    {
      props.iterations.length &&
      props.iterations.map((_: IterationSchema, k: number) => (
        <Item
          onClick     ={() => props.select(k)}
          onMouseEnter={() => props.select(k)}
          isSelected  ={props.isSelected(k)}
          key         ={k}
        >
          {k + 1}
        </Item>
      ))

    }
    <Item
      onClick   ={props.startRevision}
      isSelected={props.isSelected(props.iterations.length)}
      key       ={props.iterations.length}
      floatRight
    >
      <span className='pt-icon-size pt-icon-edit' />
    </Item>

    <br />
    <br />
  </div>
)

export default Timeline
