import {userService} from '../service/user'
import {postService} from '../service/post'
import {iterationService} from '../service/iteration'

describe('Posts Service', () => {
  beforeAll(async () => {
    let user
    try {
      user = await userService.create({username: 'foobar'})
    } catch (e) {
      user = await userService.findByUsername('foobar')
    }
    await postService.create(user, {title: 'baz'})
  })

  describe('#all', () => {
    it('retrieves a list of posts', async () => {
      const posts = await postService.all()
      expect(posts.length).toBeGreaterThan(0)
    })
  })

  describe('#create', () => {
    it('creates a new post and initializes it with a first iteration', async () => {
      const user = await userService.findByUsername('foobar')
      const intiialCounts = {
        posts:      (await postService.all()).length,
        iterations: (await iterationService.all()).length,
      }

      await postService.create(user, {title: 'baz'})

      const counts = {
        posts:      (await postService.all()).length,
        iterations: (await iterationService.all()).length,
      }
      expect(counts.posts).toEqual(intiialCounts.posts + 1)
      expect(counts.iterations).toEqual(intiialCounts.iterations + 1)
    })
  })

  // describe('#iterations', () => {
  //   it(`retrieves a post's iterations`, async () => {
  //     const [title, body] = ['baz', 'qux']
  //     const user       = await userService.findByUsername('foobar')
  //     const post       = await postService.create(user, {title, body})
  //     const iterations = await postService.iterations(post.get('id'))

  //     expect(iterations.length).toEqual(1)
  //     expect(iterations[0].getDataValue('title')).toEqual(title)
  //     expect(iterations[0].getDataValue('body')).toEqual(body)
  //   })
  // })
})
