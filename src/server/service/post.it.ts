import {userService} from '~/server/service/user'
import {postService} from '~/server/service/post'
import {iterationService} from '~/server/service/iteration'
import {sequelize} from '~/server/db'

describe('Posts Service', () => {
  beforeAll(async () => {
    try {
      const user = await userService.signIn('foobar')
      await postService.create(user, {title: 'baz', body: 'foobar'})
    } catch (e) {
      throw e
    }
  })

  describe('#all', () => {
    it('retrieves a list of posts', async () => {
      const posts = await postService.all()
      expect(posts.length).toBeGreaterThan(0)
    })
  })

  describe('#create', () => {
    it('creates a new post and initializes it with a first iteration', async () => {
      const user = await userService.findByFacebookId('foobar')
      const intiialCounts = {
        posts: (await postService.all()).length,
        iterations: (await iterationService.all()).length,
      }

      await postService.create(user, {title: 'baz', body: 'blah'})

      // TODO: remove this after replacing calls to iterationService with graphql queries
      const counts = {
        posts: (await postService.all()).length,
        iterations: (await iterationService.all()).length,
      }
      expect(counts.posts).toEqual(intiialCounts.posts + 1)
      expect(counts.iterations).toEqual(intiialCounts.iterations + 1)
    })
    it('rejects an empty title', async () => {
      const user = await userService.findByFacebookId('foobar')
      postService.create(user, {title: '', body: ''}).catch(reason => {
        expect(reason).toEqual('Please provide a title.')
      })
    })
    it('rejects an empty title', async () => {
      const user = await userService.findByFacebookId('foobar')
      postService.create(user, {title: 'x', body: ''}).catch(reason => {
        expect(reason).toEqual('Please write something.')
      })
    })
  })

  describe('#iterations', () => {
    // TODO: remove this after replacing calls to postService.iterations with graphql queries
    it(`retrieves a post's iterations`, async () => {
      const [title, body] = ['baz', 'qux']
      const user = await userService.findByFacebookId('foobar')
      const post = await postService.create(user, {title, body})
      const iterations = await postService.iterations(post.get('id'))

      expect(iterations.length).toEqual(1)
      expect(iterations[0].getDataValue('title')).toEqual(title)
      expect(iterations[0].getDataValue('body')).toEqual(body)
    })
    it('returns an empty a post when postId does not exist', async () => {
      const iterations = await postService.iterations(123)
      expect(iterations).toEqual([])
    })
  })

  describe('#iterate', () => {
    it(`creates an iteration for the given post with the provided title, body`, async () => {
      const [oldTitle, oldBody] = ['baz', 'qux']
      const [newTitle, newBody] = ['foo', 'bar']
      const user = await userService.findByFacebookId('foobar')
      const post = await postService.create(user, {
        title: oldTitle,
        body: oldBody,
      })
      const iteration = await postService.iterate(post.get('id'), {
        title: newTitle,
        body: newBody,
      })
      const iterations = await postService.iterations(post.get('id'))

      expect(iterations.length).toEqual(2)
      expect(iteration.getDataValue('title')).toEqual(newTitle)
      expect(iteration.getDataValue('body')).toEqual(newBody)
      expect(iterations[1].getDataValue('title')).toEqual(newTitle)
      expect(iterations[1].getDataValue('body')).toEqual(newBody)
    })
    it(`rejects an id that does not correspond to an existing post`, async () => {
      try {
        await postService.iterate(123, {title: 'newTitle', body: 'newBody'})
      } catch (e) {
        expect(e.name).toEqual('SequelizeForeignKeyConstraintError')
      }
    })
  })

  afterAll(() => {
    sequelize.close()
  })
})
