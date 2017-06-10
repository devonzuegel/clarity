export const types = {
  SET_USERNAME: 'sign-in/set-facebookId',
}

export type IAction = {
  type: string,
  facebookId: string|null,
}

export interface IActions {
  setFacebookId (facebookId: string|null): IAction
}

export const actions = {
  setFacebookId: (facebookId: string|null) => ({
    type: types.SET_USERNAME,
    facebookId,
  }),
}
