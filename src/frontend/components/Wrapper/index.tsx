import * as React from 'react'

const s = require('./styles.css')

const Wrapper = ({children}: {children?: JSX.Element}) =>
  <div className={s['centered-wrapper']}>
    {children}
  </div>

export default Wrapper
