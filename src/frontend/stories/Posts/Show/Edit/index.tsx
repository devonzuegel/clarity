import * as React from 'react'

import * as api from '~/frontend/api'
import Form from '~/frontend/stories/Posts/Form'
import {IFormState} from '~/frontend/stories/Posts/Form/reducers'
import {IterationSchema} from '~/server/db/models/iteration'

type IEditProps = {
  iteration: IterationSchema
  addIteration: (i: IterationSchema) => void
}

const Edit = (props: IEditProps) => {
  const onSubmit = async (newState: IFormState) => {
    try {
      const newIteration = await api.iterate(props.iteration.postId, newState)
      props.addIteration(newIteration)
    } catch (e) {
      console.error(e)
    }
  }
  return <Form iteration={props.iteration} onSubmit={onSubmit} buttonText="Revise" />
}

export default Edit
