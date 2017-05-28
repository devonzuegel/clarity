import * as Redux  from 'redux'
import {rootReducer} from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function,
  }
}

export const configureStore = (): Redux.Store<any> => {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = Redux.createStore(rootReducer, devtools)

  if (module.hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'))
    })
  }

  return store
}
