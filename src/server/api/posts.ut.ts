import {MockUserService} from '../service/user.mock'
import {MockPostService} from '../service/post.mock'

// TODO: refactor to inject the UserService dependency rather than manually mocking it out
jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

// TODO: refactor to inject the PostService dependency rather than manually mocking it out
jest.mock('../service/post', () => ({
  postService: new MockPostService(),
}))

import {create} from './posts'

const equals = (expected: any) => (u: any) => expect(u).toEqual(expected)
const user = {
  dataValues: {
    id: 123,
  },
}

describe('Posts API', () => {

  describe('create', () => {
    it('returns successfully', () => {
      create('foobar').then(equals({
        dataValues: {
          userId: user.dataValues.id,
        },
      }))
    })

    it('fails when the username is not associated with an existing user', () => {
      create('thisUsernameDoesntExist')
        .then(equals({
          dataValues: {
            userId: user.dataValues.id,
          },
        }))
        .catch(equals({message: 'User with username "thisUsernameDoesntExist" does not exist'}))
    })
  })


})


