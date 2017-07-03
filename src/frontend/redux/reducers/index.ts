import {combineReducers} from 'redux'

import {authReducer, authReducerMock} from '~/frontend/redux/reducers/auth'

/***************************************************************************
 *** Default reducer *******************************************************
 ***************************************************************************/

export const rootReducer = combineReducers({
  authReducer,
})

/***************************************************************************
 *** Development reducer + config ******************************************
 ***************************************************************************/

const devConfig = {
  /** When true, state is populated with user info upon initialization. **/
  SIGNED_IN: true,
}

export const rootReducerMock = combineReducers({
  authReducer: devConfig.SIGNED_IN ? authReducerMock : authReducer,
})

