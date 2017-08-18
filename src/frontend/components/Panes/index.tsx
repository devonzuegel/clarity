import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./styles.css')

export const Panes = (props: {children?: any; fill?: boolean}) =>
  <div
    className={classnames({
      [styles.panes]: true,
      [styles.fill]: props.fill,
    })}
  >
    {props.children}
  </div>

export const Pane = (props: {children?: any; noScroll?: boolean}) =>
  <div
    className={classnames({
      [styles.pane]: true,
      [styles['no-scroll']]: props.noScroll,
    })}
  >
    {props.children}
  </div>

export const PaneSpacer = () =>
  <div style={{height: '32px'}}>
    <Panes fill>
      <Pane />
      <Pane />
    </Panes>
  </div>
