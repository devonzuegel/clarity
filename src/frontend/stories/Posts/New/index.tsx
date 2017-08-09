import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '~/frontend/redux/actions/auth'

import New, {IProps} from './component'

type IState = {authReducer: {user: IProps}}

const mapStateToProps = (state: IState): IProps => state.authReducer.user

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
