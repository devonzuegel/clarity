import * as R from 'ramda'
import {UserInstance} from '../db/models/user'
import {GuestInstance} from '../db/models/guest'
import {userService} from '../service/user'

export const signup = (
  facebookId: string | undefined,
  session: Express.Session | undefined
) =>
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!facebookId) {
      return reject({message: 'You must provide a facebookId'})
    }
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    userService
      .create({facebookId})
      .then((user: UserInstance) => {
        session['facebookId'] = facebookId
        return resolve(user)
      })
      .catch((e: {message: string; type: string; value: string}) => {
        if (e.type === 'unique violation') {
          return reject({
            message: `The facebookId "${e.value}" is not available`,
          })
        }
        return reject(R.pick(['message'], e))
      })
  })

export const signIn = (
  facebookId: string | undefined,
  session: Express.Session | undefined
) =>
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!facebookId) {
      return reject({message: 'You must provide a facebookId'})
    }
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    userService
      .findByFacebookId(facebookId)
      .then((user: UserInstance) => {
        if (!user) {
          return reject({
            message: `User with facebookId "${facebookId}" does not exist`,
          })
        }
        session['facebookId'] = facebookId
        return resolve(user)
      })
      .catch(e => reject(e))
  })

export const signout = (session: Express.Session | undefined) =>
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }
    session['facebookId'] = undefined
    return resolve()
  })

export const getCurrentUser = (session: Express.Session | undefined) =>
  new Promise<UserInstance>((resolve: Function, reject: Function) => {
    if (!session) {
      return reject({message: 'You must initialize the API with a session'})
    }

    if (!session.facebookId) {
      return resolve(new GuestInstance())
    }

    userService
      .findByFacebookId(session.facebookId)
      .then((user: UserInstance) => resolve(user))
      .catch(e => reject(e))
  })
