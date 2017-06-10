export interface IState {
  facebookId: string
  submitting?: 'signup'|'signin'
  errorMsg: string|null
  submitAttempted: boolean
}
