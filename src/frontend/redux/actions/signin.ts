export const types = {
  SET_USERNAME: 'signIn/set-username',
}

export type IAction = {
  type: string,
  username: string|null,
}

export interface IActions {
  setUsername (username: string|null): IAction
}

export const actions = {
  setUsername: (username: string|null) => ({
    type: types.SET_USERNAME,
    username,
  }),
}
