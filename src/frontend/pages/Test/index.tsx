import * as React from 'react'

import {UserInstance} from '~/server/db/models/user'

import * as api from '~/frontend/api'

const s = require('./styles.css')

const ParentTest = () =>
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
  </div>

class Component extends React.Component<{}, {users?: UserInstance[]}> {
  state = {users: undefined}

  async retrieveUsers() {
    const users: UserInstance[] = await api.getUsers()
    this.setState({users})
  }

  componentDidMount() {
    this.retrieveUsers()
  }

  render() {
    return (
      <div>
        <h2>
          Users
        </h2>
        <pre className={s['pre']}>
          {this.state.users
            ? JSON.stringify(this.state.users, null, 2)
            : 'Retrieving users...'}
        </pre>

        <br />

        <h2>
          Parent/Child Test
        </h2>
        <ParentTest />
      </div>
    )
  }
}
export default Component
