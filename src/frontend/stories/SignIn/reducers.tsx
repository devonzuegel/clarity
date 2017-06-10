import { IState } from './IState'

export const updateUsername = (newUsername: string) => (prevState: IState): IState => ({
  ...prevState,
  facebookId: newUsername,
})

export const beginSubmit = (action: 'signup'|'signin') => (prevState: IState): IState => ({
  ...prevState,
  submitAttempted: true,
  submitting: action,
})

export const endSubmit = (prevState: IState): IState => ({
  ...prevState,
  submitting: undefined,
})

export const setError = (errorMsg: string) => (prevState: IState) => ({
  ...prevState,
  errorMsg,
})

export const removeError = (prevState: IState) => ({
  ...prevState,
  errorMsg: null,
})
