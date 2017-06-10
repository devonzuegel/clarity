export const types = {
  SET_USERNAME: 'signIn/set-facebookId',
}

export type IAction = {
  type: string,
  facebookId: string|null,
}

export interface IActions {
  setUsername (facebookId: string|null): IAction
}

export const actions = {
  setUsername: (facebookId: string|null) => ({
    type: types.SET_USERNAME,
    facebookId,
  }),
}
