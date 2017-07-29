export const types = {
  SET_USERNAME: 'sign-in/set-username',
  SIGN_IN: 'sign-in/set-facebookId',
  SIGN_OUT: 'sign-out/rm-user',
}

export type IAction = {
  type: string
  facebookId?: string | null
  displayName?: string | null
  username?: string | null
}

export interface IActions {
  setUsername(username: string): IAction
  signIn(facebookId: string | null, displayName: string | null): IAction
  signOut(): null
}

export const actions = {
  setUsername: (username: string) => ({
    type: types.SET_USERNAME,
    username,
  }),

  signIn: (facebookId: string | null, displayName: string | null) => ({
    type: types.SIGN_IN,
    facebookId,
    displayName,
  }),

  signOut: () => ({
    type: types.SIGN_OUT,
  }),
}
