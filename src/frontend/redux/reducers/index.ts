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
  /*
   * When true, state is populated with user info upon initialization.
   * Note: SIGNED_IN must be false for FTs to pass.
   */
  SIGNED_IN: false,
}

export const rootReducerMock = combineReducers({
  authReducer: devConfig.SIGNED_IN ? authReducerMock : authReducer,
})

