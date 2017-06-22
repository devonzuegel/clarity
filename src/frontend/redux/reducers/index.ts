import {combineReducers} from 'redux'

import {authReducer, authReducerMock} from '~/frontend/redux/reducers/auth'

export const rootReducer = combineReducers({
  authReducer,
})

export const rootReducerMock = combineReducers({
  authReducer: authReducerMock,
})
