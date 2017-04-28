import {GuestInstance} from '~/server/db/models/guest'
import {types}         from '~/frontend/redux/actions/login'
import {IAction}       from '~/frontend/redux/actions/login'

const initialState = {user: new GuestInstance}

export const loginReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {user: {username: action.username}}

    default:
      return state
  }
}
