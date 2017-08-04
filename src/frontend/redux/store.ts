import * as Redux from 'redux'
import * as persistState from 'redux-localstorage'

import Hermes from '~/../utils/hermes'
import {rootReducer, rootReducerMock} from '~/frontend/redux/reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

const useMock = false // Should only be true for development
const logger = new Hermes({name: 'frontend'})

const configureStore = (): Redux.Store<any> => {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__
  const _m = module as any
  const enhancer = Redux.compose((persistState as any)())

  if (_m.hot && useMock) {
    logger.info('Loading rootReducerMock')
    const store = Redux.createStore(
      rootReducerMock,
      devtools && devtools(),
      enhancer
    )
    _m.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')))
    return store
  }

  const store = Redux.createStore(rootReducer, devtools && devtools(), enhancer)
  return store
}

const store = configureStore()

export default store
