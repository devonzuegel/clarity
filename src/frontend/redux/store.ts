import * as Redux from 'redux'

import Hermes from '~/../utils/hermes'
import {rootReducer, rootReducerMock} from '~/frontend/redux/reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

const logger = new Hermes({name: 'frontend'})

const configureStore = (): Redux.Store<any> => {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__
  const _m = module as any

  if (_m.hot) {
    logger.info('Loading rootReducerMock')
    const store = Redux.createStore(rootReducerMock, devtools && devtools())
    _m.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')))
    return store
  }

  const store = Redux.createStore(rootReducer, devtools && devtools())
  return store
}

const store = configureStore()

export default store
