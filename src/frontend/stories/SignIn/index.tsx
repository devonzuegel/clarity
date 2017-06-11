import * as React           from 'react'
import * as page            from 'page'
import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'

import {FacebookProfile} from '~/../utils/models/FacebookProfile'

import {actions, IActions} from '~/frontend/redux/actions/auth'
import * as api            from '~/frontend/api'
import {urls}              from '~/frontend/routes'
import LoadingOverlay      from  '~/frontend/components/LoadingOverlay'

class SignIn extends React.Component<{actions: IActions}, {}> {
  signInAndRedirect () {
    console.log('alsdkfjasldkfj!')
    api
      .getProfile()
      .then((profile: FacebookProfile) => {
        this.props.actions.signIn(profile.id, profile.displayName)
        page.redirect(urls.posts)
      })
  }

  componentDidMount () {
    this.signInAndRedirect()
  }

  render() {
    return <LoadingOverlay />
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn as any)
