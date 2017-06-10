export const types = {
  SIGN_IN: 'sign-in/set-facebookId',
}

export type IAction = {
  type: string,
  facebookId: string|null,
}

export interface IActions {
  signIn (facebookId: string|null): IAction
}

export const actions = {
  signIn: (facebookId: string|null) => ({
    type: types.SIGN_IN,
    facebookId,
  }),
}
