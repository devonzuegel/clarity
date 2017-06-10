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
const iteration = {
  title: 'baz',
  body:  'qux',
}

describe('Posts API', () => {

  describe('create', () => {
    it('returns successfully', () => {
      create('foobar', iteration).then(equals({
        dataValues: {
          userId: user.dataValues.id,
        },
      }))
    })

    it('fails when the facebookId is not associated with an existing user', () => {
      create('thisUsernameDoesntExist', iteration)
        .then(equals({
          dataValues: {
            userId: user.dataValues.id,
          },
        }))
        .catch(equals({message: 'User with facebookId "thisUsernameDoesntExist" does not exist'}))
    })
  })


})


