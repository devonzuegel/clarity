import {combineReducers} from 'redux'
import {loginReducer} from './login'

export const rootReducer = combineReducers({
  loginReducer,
})
