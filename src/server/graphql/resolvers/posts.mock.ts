export const mockPosts = [
  {
    id: 1,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 3,
    userId: 2,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
]

export default (user?: {id: number}) => (_: any, _args: {[k: string]: any}) => {
  if (!user) {
    return mockPosts
  }
  const belongsTo = ({userId}: {userId: number}) => userId === user.id
  return R.filter(belongsTo, mockPosts)
}
