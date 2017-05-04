export interface IState {
  username: string
  submitting?: 'signup'|'signin'
  errorMsg: string|null
  submitAttempted: boolean
}
