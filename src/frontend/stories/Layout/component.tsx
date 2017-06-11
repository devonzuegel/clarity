import * as React from 'react'

import {FacebookProfile} from '~/../utils/models/FacebookProfile'

import * as api        from '~/frontend/api'
import {IActions}      from '~/frontend/redux/actions/auth'
import LayoutComponent from '~/frontend/components/Layout'


interface ILayout {
  actions:     IActions
  displayName: string
}

class Layout extends React.Component<ILayout, {}> {
  componentWillMount () {
    const setFacebookId = (profile: FacebookProfile) => {
      this.props.actions.signIn(profile.id, profile.displayName)
    }
    api.getProfile()
      .then(setFacebookId)
  }

  render () {
    return (
      <LayoutComponent displayName={this.props.displayName}>
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
