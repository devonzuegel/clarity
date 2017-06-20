import * as React from 'react'
import Diff from '~/frontend/components/Diff'

const s = require('./styles.css')

export default () =>
  <div>
    <div className={s['parent']}>
      This is outside <span className={s['badge']}>{s['parent']}</span>
      <div className={s['inner']}>
        This is inside <span className={s['badge']}>{s['inner']}</span>
      </div>
      <div className="inner">
        This is inside <span className={s['badge']}>inner</span>
      </div>
    </div>
    <Diff
      old="Run the initial migration to get your db in the correct state."
      new="Run the migration to get your development db in the right state."
    />
  </div>
