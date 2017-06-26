import * as React from 'react'

import Hermes from '~/../utils/hermes'

import * as api from '~/frontend/api'

const logger = new Hermes({name: 'frontend'})

interface IState {
  profile: any // TODO
}

class Me extends React.Component<{}, IState> {
  state = {profile: undefined}

  componentWillMount() {
    this.retrieveData()
  }

  async retrieveData() {
    try {
      const profile = await api.getProfile()
      this.setState({profile})
    } catch (e) {
      logger.warn(e.message)
    }
  }

  render() {
    return (
      <pre>
        {JSON.stringify(this.state.profile, null, 2)}
      </pre>
    )
  }
}

export default Me
