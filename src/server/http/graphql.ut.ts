import {getWithData} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

import GraphqlAPI from '~/server/http/graphql'
import {mockBooks} from '~/server/graphql/schema'

const app = newApp([GraphqlAPI])

describe('GraphQL API', () => {
  describe('/api/users/create', () => {
    it('returns a created user', done => {
      getWithData(app, '/graphql', {query: '{books{id,title}}'}, res => {
        expect(res.body).toEqual({data: {books: mockBooks}})
        done()
      })
    })
  })
})
