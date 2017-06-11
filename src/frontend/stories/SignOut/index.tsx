import * as React           from 'react'
import * as page            from 'page'
import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions, IActions} from '~/frontend/redux/actions/auth'
import * as api            from '~/frontend/api'


class SignOut extends React.Component<{actions: IActions}, {}> {
  signOutAndRedirect () {
    this.props.actions.signOut()
    api.signout()
      .then (() => page.redirect('/posts'))
      .catch(() => page.redirect('/posts'))
  }

  componentDidMount () {
    this.signOutAndRedirect()
  }

  render() {
    return (
      <div>
        Signing out...
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignOut as any)
