import * as Redux from 'redux'
import {rootReducer} from './reducers'
// TODO: put back rootReducerMock
// import {rootReducer, rootReducerMock} from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

const configureStore = (): Redux.Store<any> => {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__
  const _module = module as any

  if (_module.hot) {
    const store = Redux.createStore(rootReducer, devtools && devtools())
    _module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')))
    return store
  }

  const store = Redux.createStore(rootReducer, devtools && devtools())
  return store
}

const store = configureStore()

export default store
