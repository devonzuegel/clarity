import * as G from 'graphql'

export const mockBooks = [
  {id: '111', title: 'Moby Dick'},
  {id: '222', title: 'Invisible Cities'},
  {id: '333', title: '1984'},
  {id: '444', title: 'A History of Future Cities'},
]

const Type = new G.GraphQLObjectType({
  name: 'book',
  fields: {
    id: {type: G.GraphQLID},
    title: {type: G.GraphQLString},
  },
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    id: {type: G.GraphQLID},
  },
  resolve: (_: any, _args: {[k: string]: any}) => mockBooks,
}
