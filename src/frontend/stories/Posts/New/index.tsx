import {connect} from 'react-redux'

import {IPerson} from '~/server/db/models/person'

import New from './component'


type IState = {authReducer: {user: IPerson}}
type IProps = {facebookId: string|null}

const mapStateToProps = (state: IState): IProps =>
  state.authReducer.user

const mapDispatchToProps = (_dispatch: any) =>
  ({})

export default connect(mapStateToProps, mapDispatchToProps)(New)
