import * as React from 'react'
import * as R from 'ramda'
import * as Blueprint from '@blueprintjs/core'

import MarkdownEditor from '~/frontend/components/MarkdownEditor'
import {Field} from '~/frontend/components/Field'
import {dasherize} from '~/../utils/test/string'

import * as reducers from './reducers'

type IFormProps = {
  iteration: {title?: string; body?: string}
  onSubmit: (i: reducers.IState) => void
  buttonText: string
}

class Form extends React.Component<IFormProps, reducers.IState> {
  state = {
    title: this.props.iteration.title || '',
    body: this.props.iteration.body || '',
  }

  submit = () => this.props.onSubmit(this.state)

  private updateTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateTitle(e.currentTarget.value))
  }

  private updateBody = (s: string) => {
    this.setState(reducers.updateBody(s))
  }

  render() {
    const formId = `post-form--${dasherize(this.props.buttonText)}`

    const emptyField = R.contains('', [this.state.title, this.state.body])

    const hasNotBeenUpdated =
      this.state.title === this.props.iteration.title &&
      this.state.body === this.props.iteration.body

    const isValid = R.not(hasNotBeenUpdated || emptyField)

    return (
      <div className="" id={formId}>
        <Field
          label=""
          placeholder="Title"
          value={this.state.title}
          onChange={this.updateTitle}
          id={`${formId}__title`}
        />
        <MarkdownEditor
          options={{
            initialValue: this.props.iteration.body || '',
            placeholder: 'Start writing!',
          }}
          onChange={this.updateBody}
        />
        <Blueprint.Button
          intent={Blueprint.Intent.PRIMARY}
          onClick={this.submit}
          disabled={!isValid}
          id={`${formId}__create-button`}
          style={{width: '100px', marginRight: '12px'}}
        >
          {this.props.buttonText}
        </Blueprint.Button>
      </div>
    )
  }
}

export default Form
