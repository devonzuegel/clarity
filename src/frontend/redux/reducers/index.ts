import {combineReducers} from 'redux'
import {signInReducer} from './signIn'

export const rootReducer = combineReducers({
  signInReducer,
})
