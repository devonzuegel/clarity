import * as React from 'react'

const s = require('./styles.css')

const Truncated = ({children}: {children?: any}) => {
  return (
    <div className={s['with-ellipsis']}>
      <p className={s['read-more-wrap']}>
        {children}
      </p>
    </div>
  )
}

export default Truncated
