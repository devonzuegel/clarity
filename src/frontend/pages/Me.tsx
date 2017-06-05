import * as React from 'react'

import * as api from '~/frontend/api'


interface IState {
  profile: any // TODO
}

class Me extends React.Component<{}, IState> {
  state = {profile: undefined}

  componentWillMount () {
    this.retrieveData()
  }

  async retrieveData () {
    try {
      const profile = await api.getProfile()
      this.setState({profile})
    } catch (e) {
      alert(e.message)
    }
  }

  render () {
    return (
      <pre>
        {JSON.stringify(this.state.profile, null, 2)}
      </pre>
    )
  }
}

export default Me

