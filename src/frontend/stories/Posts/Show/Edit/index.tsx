import * as React     from 'react'
import * as Blueprint from '@blueprintjs/core'


import * as api          from '~/frontend/api'
import {Field}           from '~/frontend/components/Field'
import {IterationSchema} from '~/server/db/models/iteration'

interface IState {title: string, body: string}

export const reducers = {
  updateTitle: (newTitle: string) => (prevState: IState): IState => ({
    ...prevState,
    title: newTitle,
  }),
  updateBody: (newBody: string) => (prevState: IState): IState => ({
    ...prevState,
    body: newBody,
  }),
}

type IEditProps = {
  iteration: IterationSchema,
  addIteration: (i: IterationSchema) => void,
}

class Edit extends React.Component<IEditProps, IState> {
  state = {
    title: this.props.iteration.title,
    body:  this.props.iteration.body || '',
  }

  submit = async () => {
    try {
      const newIteration = await api.iterate(this.props.iteration.postId, this.state)
      console.log(newIteration)
      this.props.addIteration(newIteration)
    } catch (e) {
      console.error(e)
    }
  }

  private updateTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateTitle(e.currentTarget.value))
  }

  private updateBody = (s: string) => {
    this.setState(reducers.updateBody(s))
  }

  render () {
    return (
      <div className='pt-card'>
        <Field
          label   =''
          value   ={this.state.title}
          onChange={this.updateTitle}
          id      ='post--new__title'
        />
        <Blueprint.EditableText
          multiline
          value   ={this.state.body}
          onChange={this.updateBody}
          minLines={3}
          maxLines={6}
        />
        <Blueprint.Button
          intent  ={Blueprint.Intent.PRIMARY}
          onClick ={this.submit}
          id      ='post--new__create-button'
          style   ={{width: '100px', marginRight: '12px'}}
         >
          Revise
        </Blueprint.Button>
      </div>
    )
  }
}


export default Edit
