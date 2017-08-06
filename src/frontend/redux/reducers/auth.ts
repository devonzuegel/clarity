import {types} from '~/frontend/redux/actions/auth'
import {IAction} from '~/frontend/redux/actions/auth'
import profileMock from '~/server/service/authentication/profile.mock'

interface IAuthState {
  user?: {
    facebookId?: string
    displayName?: string
    username?: string
  }
}

const reducer = (_initialState: IAuthState) => (
  state: IAuthState = _initialState,
  action: IAction
) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {
        ...state,
        user: {...state.user, username: action.username},
      }

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
        user: null,
      }

    default:
      return state
  }
}

/***************************************************************************
 *** Default reducer *******************************************************
 ***************************************************************************/

export const authReducer = reducer({
  user: undefined,
})

/***************************************************************************
 *** Development reducer ***************************************************
 ***************************************************************************/

export const authReducerMock = reducer({
  user: {
    facebookId: profileMock().id,
    displayName: profileMock().displayName,
  },
})
