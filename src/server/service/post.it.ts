import {userService} from '../service/user'
import {postService} from '../service/post'
import {iterationService} from '../service/iteration'
import {PostInstance} from '../db/models/post'
import {UserInstance} from '../db/models/user'

const createPost = (done: Function) => (user: UserInstance) => {
  postService
    .create(user, {title: 'baz'})
    .then((_: PostInstance) => done())
}

describe('Posts Service', () => {
  beforeAll((done) => {
    userService
      .create({username: 'foobar'})
      .then(createPost(done))
      .catch(_ => {
        userService
          .findByUsername('foobar')
          .then(createPost(done))
      })
  })

  describe('#all', () => {
    xit('retrieves a list of posts', (done) => {
      postService.all()
        .then((posts: PostInstance[]) => {
          expect(posts.length).toBeGreaterThan(0)
          done()
        })
    })
  })

  describe('#create', () => {
    xit('creates a new post and initializes it with a first iteration', async (done) => {
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
      done()
    })
  })
})
