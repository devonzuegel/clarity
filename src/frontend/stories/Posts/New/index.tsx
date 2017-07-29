import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '~/frontend/redux/actions/auth'

import New, {INewProps} from './component'

type IState = {authReducer: {user: INewProps}}

const mapStateToProps = (state: IState): INewProps => state.authReducer.user

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
