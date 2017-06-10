import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions}            from '~/frontend/redux/actions/signIn'


import Layout from './component'

interface IState {
  user: {facebookId: string}
}

const mapStateToProps = (state: {signInReducer: IState}) => ({
  facebookId: state.signInReducer.user.facebookId,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
