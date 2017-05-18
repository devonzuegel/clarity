import * as React from 'react'

import {IPerson} from '~/server/db/models/person'

import * as api        from '~/frontend/api'
import {IActions}      from '~/frontend/redux/actions/signIn'
import LayoutComponent from '~/frontend/components/Layout'


class Layout extends React.Component<{actions: IActions, user: IPerson}, {}> {
  componentWillMount () {
    api.getSession()
      .then((u: IPerson) => this.props.actions.setUsername(u.username))
  }

  render () {
    return (
      <LayoutComponent user={this.props.user}>
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
