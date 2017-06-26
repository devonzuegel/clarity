import * as React from 'react'

const s = require('./styles.css')

const Wrapper = ({content}: {content: JSX.Element}) =>
  <div className={s['top-level-wrapper']}>
    <div className={s['centered-wrapper']}>
      {content}
    </div>
  </div>

export default Wrapper
