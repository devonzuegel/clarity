export const mockUsers = [
  {
    id: 1,
    facebookId: 'foo',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    facebookId: 'baz',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
]

export default (_: any, _args: {[k: string]: any}) => mockUsers
