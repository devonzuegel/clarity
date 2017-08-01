import * as React from 'react'
import * as page from 'page'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions, IActions} from '~/frontend/redux/actions/auth'
import * as api from '~/frontend/api'
import {urls} from '~/frontend/routes'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

class SignOut extends React.Component<{actions: IActions}, {}> {
  signOutAndRedirect() {
    this.props.actions.signOut()
    api
      .signout()
      .then(() => page.redirect(urls.home))
      .catch(() => page.redirect(urls.home))
  }

  componentDidMount() {
    this.signOutAndRedirect()
  }

  render() {
    return <LoadingOverlay />
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignOut as any)
