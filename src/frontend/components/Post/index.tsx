import * as React from 'react'
import * as R from 'ramda'

import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'
import {IterationSchema} from '~/server/db/models/iteration'

export interface IPost {
  slug: string
  iterations: IterationSchema[]
  user: {username: string}
}

export const Post = (post: IPost, i: number) => {
  const lastIteration = R.last(post.iterations)
  return (
    <div key={i}>
      {i !== 0 && <br />}
      <h4 className="post-list--post-title">
        <a href={urls.post(post.user.username, post.slug)}>
          {lastIteration.title}
        </a>
      </h4>
      <label className="pt-text-muted">
        {formatDateLong(lastIteration.createdAt)}
      </label>
      <br />
    </div>
  )
}
