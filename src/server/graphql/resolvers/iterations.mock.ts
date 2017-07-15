const resolver = (post: {id: number}) => (_: any, _args: {[k: string]: any}) => [
  {
    id: 1,
    postId: post.id,
    title: 'First title',
    body: 'First body',
    createdAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    postId: post.id,
    title: 'Second title',
    body: 'Second body',
    createdAt: '2017-07-01 02:37:28.363',
  },
]

export default (post?: {id: number}) => resolver(post || {id: 1})
