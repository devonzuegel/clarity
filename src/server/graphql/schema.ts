import * as G from 'graphql'

const bookType = new G.GraphQLObjectType({
  name: 'book',
  fields: {
    id: {type: G.GraphQLID},
    title: {type: G.GraphQLString},
  },
})

const graphqlSchema = new G.GraphQLSchema({
  query: new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      books: {
        type: new G.GraphQLList(bookType),
        args: {
          id: {type: G.GraphQLID},
        },
        resolve(_, _args) {
          return [
            {id: 111, title: 'Moby Dick'},
            {id: 222, title: 'Invisible Cities'},
            {id: 333, title: '1984'},
            {id: 444, title: 'A History of Future Cities'},
          ]
        },
      },
    },
  }),
})

export default graphqlSchema
