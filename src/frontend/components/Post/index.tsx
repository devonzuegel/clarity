import * as React from 'react'
import * as R from 'ramda'

import {formatDateLong} from '~/../utils/date'
import {urls} from '~/frontend/routes'

export interface IPost {id: number; iterations: IIteration[]}
export interface IIteration {title: string; body: string; createdAt: string}

export const Post = (post: IPost, i: number) => {
  const lastIteration = R.last(post.iterations)
  return (
    <div key={i}>
      {post.id !== 0 && <br />}
      <h4 className="post-list--post-title">
        <a href={urls.post(post.id)}>
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
