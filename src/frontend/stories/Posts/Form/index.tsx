import * as React     from 'react'
import * as Blueprint from '@blueprintjs/core'


import {Field}     from '~/frontend/components/Field'
import {dasherize} from '~/../utils/test/string'

import * as reducers from './reducers'


type IFormProps = {
  iteration:  {title?: string, body?: string},
  onSubmit:   (i: reducers.IState) => void,
  buttonText: string,
}

class Form extends React.Component<IFormProps, reducers.IState> {
  state = {
    title: this.props.iteration.title || '',
    body:  this.props.iteration.body || '',
  }

  submit = () => this.props.onSubmit(this.state)

  private updateTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateTitle(e.currentTarget.value))
  }

  private updateBody = (s: string) => {
    this.setState(reducers.updateBody(s))
  }

  render () {
    const formId = `post-form--${dasherize(this.props.buttonText)}`
    return (
      <div className='pt-card' id={formId}>
        <Field
          label   =''
          value   ={this.state.title}
          onChange={this.updateTitle}
          id      ={`${formId}__title`}
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
          id      ={`${formId}__create-button`}
          style   ={{width: '100px', marginRight: '12px'}}
         >
          {this.props.buttonText}
        </Blueprint.Button>
      </div>
    )
  }
}

export default Form
