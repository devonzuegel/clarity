import {GuestInstance} from '~/server/db/models/guest'
import {types}         from '~/frontend/redux/actions/signIn'
import {IAction}       from '~/frontend/redux/actions/signIn'

const initialState = {user: new GuestInstance}

export const signInReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {user: {facebookId: action.facebookId}}

    default:
      return state
  }
}
