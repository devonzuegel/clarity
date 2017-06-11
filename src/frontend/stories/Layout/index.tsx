import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions} from '~/frontend/redux/actions/auth'
import Layout    from '~/frontend/stories/Layout/component'


interface IState {
  user: {facebookId: string, displayName: string}
}

const mapStateToProps = (state: {authReducer: IState}) =>
  state.authReducer.user

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout as any)

