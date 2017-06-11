export type FacebookProfile = {
  id:          string,
  facebookId:  string,
  displayName: string,
  provider:    string,
  _raw:        string,
  _json: {
    name: string,
    id:   string,
  }
}
