import * as React from 'react'

const s = require('./styles.css')

const Wrapper = ({children}: {children?: JSX.Element}) =>
  <div className={s['top-level-wrapper']}>
    <div className={s['centered-wrapper']}>
      {children}
    </div>
  </div>

export default Wrapper
