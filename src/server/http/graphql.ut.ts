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
    getWithData(app, '/graphql', {query: '{users{id,facebookId}}'}, res => {
      expect(res.body).toEqual({data: {users: mockUsers}})
      done()
    })
  })
})
