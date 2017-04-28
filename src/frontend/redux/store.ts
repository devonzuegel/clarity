import * as Redux  from 'redux'
import {rootReducer} from './reducers'

export const configureStore = (): Redux.Store<any> => {
  const store = Redux.createStore(rootReducer)

  if (module.hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'))
    })
  }

  return store
}
