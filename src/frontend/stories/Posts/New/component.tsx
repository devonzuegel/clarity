import * as React from 'react'

import * as api               from '~/frontend/api'
import {IState as IFormState} from '~/frontend/stories/Posts/Form/reducers'
import Form                   from '~/frontend/stories/Posts/Form'


type INewProps = {facebookId: string}

const New = ({facebookId}: INewProps) => {
  const onSubmit = async (newState: IFormState) => {
    try {
      await api.newPost({...newState, facebookId})
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Form
      iteration ={{}}
      onSubmit  ={onSubmit}
      buttonText='Create'
    />
  )
}

export default New
