import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions}            from '~/frontend/redux/actions/auth'


import Layout from './component'

interface IState {
  user: {facebookId: string}
}

const mapStateToProps = (state: {authReducer: IState}) => ({
  facebookId: state.authReducer.user.facebookId,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
