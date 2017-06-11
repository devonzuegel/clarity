import {combineReducers} from 'redux'

import {authReducer} from '~/frontend/redux/reducers/auth'


export const rootReducer = combineReducers({
  authReducer,
})
