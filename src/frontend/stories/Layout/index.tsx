import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions}            from '~/frontend/redux/actions/signIn'

import {IPerson} from '~/server/db/models/person'

import Layout from './component'

interface IState {
  user: IPerson
}

const mapStateToProps = (state: {signInReducer: IState}): IState => ({
  user: state.signInReducer.user,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
