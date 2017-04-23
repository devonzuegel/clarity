import {UserInstance} from '../db/models/user'
import {userService} from '../service/user'

export const login = (username: string|undefined, session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!username) {
      return reject({message: 'You must provide a username'})
    }
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    userService.findByUsername(username).then((user: UserInstance) => {
      session['username'] = username
      return resolve(user)
    }).catch(e => reject(e))
  })
)

export const getCurrentUser = (session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }

    if (!session.username) {
      return reject({message: 'There is no active session'})
    }

    userService
      .findByUsername(session.username)
      .then((user: UserInstance) => resolve(user))
      .catch(e => reject(e))
  })
)
