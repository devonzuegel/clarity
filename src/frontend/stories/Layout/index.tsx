import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions} from '~/frontend/redux/actions/auth'
import Layout from '~/frontend/components/Layout'

interface IState {
  user: {facebookId: string; displayName: string; username: string}
}

const mapStateToProps = (state: {authReducer: IState}) => {
  return state.authReducer.user
}

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

const mergeProps = (
  stateProps: {facebookId: string; displayName: string; username: string},
  _: any,
  ownProps: {wrapper?: boolean}
) => ({
  ...stateProps,
  ...ownProps,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Layout as any
)
