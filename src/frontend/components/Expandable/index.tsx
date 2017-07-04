import * as React from 'react'
import {randomStr} from '~/../utils/test/string'

const s = require('./styles.css')

const Expandable = ({children}: {children?: any}) => {
  const checkboxId = randomStr()
  return (
    <div>
      <input type="checkbox" className={s['expandable--state']} id={checkboxId} />

      <div className={s['expandable']}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>

      <label
        htmlFor={checkboxId}
        className={`pt-button ${s['expandable--trigger']}`}
      />
    </div>
  )
}

export default Expandable
