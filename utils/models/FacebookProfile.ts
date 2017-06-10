export type FacebookProfile = {
  id:          string,
  facebookId: string,
  provider:    string,
  _raw:        string,
  _json: {
    name: string,
    id:   string,
  }
}
