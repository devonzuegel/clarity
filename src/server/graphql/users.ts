import * as G from 'graphql'

export const mockUsers = [
  {id: '111', facebookId: 'foobar'},
  {id: '222', facebookId: 'bazbar'},
]

const Type = new G.GraphQLObjectType({
  name: 'user',
  fields: {
    id: {type: G.GraphQLID},
    facebookId: {type: G.GraphQLString},
  },
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    facebookId: {type: G.GraphQLID},
  },
  resolve: (_: any, _args: {[k: string]: any}) => mockUsers,
}
