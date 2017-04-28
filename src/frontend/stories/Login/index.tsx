import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions} from '~/frontend/redux/actions/login'
import Login     from './component'

const mapStateToProps = (_state: any) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
