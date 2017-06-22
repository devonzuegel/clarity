import {types} from '~/frontend/redux/actions/auth'
import {IAction} from '~/frontend/redux/actions/auth'

interface IAuthState {
  user: {
    facebookId?: string
    displayName?: string
  }
}

const reducer = (_initialState: IAuthState) => (
  state: IAuthState = _initialState,
  action: IAction
) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state, 
        user: {
          facebookId: action.facebookId,
          displayName: action.displayName,
        },
      }

    case types.SIGN_OUT:
      return {
        ...state, 
        user: {facebookId: null},
      }

    default:
      return state
  }
}

export const authReducer = reducer({
  user: {},
})

export const authReducerMock = reducer({
  user: {
    facebookId: '123',
    displayName: 'Test User',
  },
})
