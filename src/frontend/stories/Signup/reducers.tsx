import { IState } from './IState'

export const updateUsername = (newUsername: string) => (prevState: IState): IState => ({
  ...prevState,
  username: newUsername,
})

export const beginSubmit = (prevState: IState): IState => ({
  ...prevState,
  submitAttempted: true,
  submitting: true,
})

export const endSubmit = (prevState: IState): IState => ({
  ...prevState,
  submitting: false,
})

export const setError = (errorMsg: string) => (prevState: IState) => ({
  ...prevState,
  errorMsg,
})

export const removeError = (prevState: IState) => ({
  ...prevState,
  errorMsg: null,
})
