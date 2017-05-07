import * as R from 'ramda'
import {UserInstance}  from '../db/models/user'
import {GuestInstance} from '../db/models/guest'
import {userService}   from '../service/user'

export const signup = (username: string|undefined, session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!username) {
      return reject({message: 'You must provide a username'})
    }
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    userService.create({username}).then((user: UserInstance) => {
      session['username'] = username
      return resolve(user)
    }).catch((e: {message: string, type: string, value: string}) => {
      if (e.type === 'unique violation') {
        return reject({message: `The username "${e.value}" is not available`})
      }
      return reject(R.pick(['message'], e))
    })
  })
)

export const signIn = (username: string|undefined, session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!username) {
      return reject({message: 'You must provide a username'})
    }
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    userService.findByUsername(username).then((user: UserInstance) => {
      if (!user) {
        return reject({message: `User with username "${username}" does not exist`})
      }
      session['username'] = username
      return resolve(user)
    }).catch(e => reject(e))
  })
)

export const signout = (session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    session['username'] = undefined
    return resolve()
  })
)

export const getCurrentUser = (session: Express.Session|undefined) => (
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }

    if (!session.username) {
      return resolve(new GuestInstance)
    }

    userService
      .findByUsername(session.username)
      .then((user: UserInstance) => resolve(user))
      .catch(e => reject(e))
  })
)
