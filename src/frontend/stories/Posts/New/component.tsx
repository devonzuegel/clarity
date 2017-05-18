import * as React     from 'react'
import * as Blueprint from '@blueprintjs/core'
import {Field}        from '~/frontend/components/Field'

import * as api from '~/frontend/api'


interface IState {title: string}

export const reducers = {
  updateTitle: (newTitle: string) => (prevState: IState): IState => ({
    ...prevState,
    title: newTitle,
  }),
}

export default class New extends React.Component<{username: string}, IState> {
  state = {title: '', body: ''}

  submit = async () => {
    try {
      await api.newPost({
        ...this.state,
        username: this.props.username,
      })
    } catch (e) {
      console.error(e)
    }
  }

  private updateTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateTitle(e.currentTarget.value))
  }

  render () {
    return (
      <div>
        <Field
          label   =''
          value   ={this.state.title}
          onChange={this.updateTitle}
          id      ='post--new__title'
        />
        <Blueprint.EditableText
          multiline
          minLines={3}
          maxLines={6}
        />
        <Blueprint.Button
          intent  ={Blueprint.Intent.PRIMARY}
          onClick ={this.submit}
          id      ='post--new__create-button'
          style   ={{width: '100px', marginRight: '12px'}}
         >
          Create
        </Blueprint.Button>
      </div>
    )
  }
}
