import {GuestInstance} from '~/server/db/models/guest'
import {types} from '~/frontend/redux/actions/auth'
import {IAction} from '~/frontend/redux/actions/auth'

const initialState = {user: new GuestInstance()}

export const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        user: {
          facebookId: action.facebookId,
          displayName: action.displayName,
        },
      }

    case types.SIGN_OUT:
      return {user: {facebookId: null}}

    default:
      return state
  }
}
