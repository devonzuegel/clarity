import * as R from 'ramda'

import {getWithData} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

import GraphqlAPI from '~/server/http/graphql'
import {mockBooks} from '~/server/graphql/books'
import {mockUsers} from '~/server/graphql/users'

const app = newApp([GraphqlAPI])

describe('GraphQL API', () => {
  it('gets the dummy book data', done => {
    getWithData(app, '/graphql', {query: '{books{id,title}}'}, res => {
      expect(res.body).toEqual({data: {books: mockBooks}})
      done()
    })
  })

  it('gets the dummy user data', done => {
    const attrs = ['id', 'facebookId']
    const query = `{
      users {
        ${attrs.join(',')}
      }
    }`
    getWithData(app, '/graphql', {query}, res => {
      const users = R.map(R.pick(attrs), mockUsers)
      expect(res.body).toEqual({data: {users}})
      done()
    })
  })

  it('gets the dummy user data with posts', done => {
    const attrs = ['id', 'facebookId']
    const query = `{
      users {
        ${attrs.join(',')}
        posts{id}
      }
    }`
    getWithData(app, '/graphql', {query}, res => {
      expect(res.body.data.users).toEqual([
        {id: 1, facebookId: 'foo', posts: [{id: 1}, {id: 2}]},
        {id: 2, facebookId: 'baz', posts: [{id: 3}]},
      ])
      done()
    })
  })

  it('gets the dummy posts data', done => {
    const attrs = ['id', 'userId']
    const query = `{
      posts {
        ${attrs.join(',')}
      }
    }`
    getWithData(app, '/graphql', {query}, res => {
      expect(res.body.data.posts).toEqual([
        {id: 1, userId: 1},
        {id: 2, userId: 1},
        {id: 3, userId: 2},
      ])
      done()
    })
  })
})
