import * as React from 'react'
import * as R from 'ramda'
import * as Blueprint from '@blueprintjs/core'

// import MarkdownEditor from '~/frontend/components/MarkdownEditor'
import Editor from '~/frontend/components/Editor'
import {Field} from '~/frontend/components/Field'
import {dasherize} from '~/../utils/test/string'

import * as reducers from './reducers'

type IFormProps = {
  iteration: {title?: string; body?: string}
  onSubmit: (i: reducers.IFormState) => void
  buttonText: string
}

class Form extends React.Component<IFormProps, reducers.IFormState> {
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
      <div id={formId}>
        <div
          style={{
            display: 'flex',
            marginLeft: '-19vw',
            marginRight: '-19vw',
          }}
        >
          <div style={{width: '50%'}}>
            <div style={{width: '75%'}}>
              <Field
                label=""
                placeholder="Title"
                value={this.state.title}
                onChange={this.updateTitle}
                id={`${formId}__title`}
              />
            </div>
          </div>
          <div style={{width: '50%', paddingLeft: '12px'}}>
            <h1>
              {this.state.title}
            </h1>
          </div>
        </div>
        {/* <MarkdownEditor
          options={{
            initialValue: this.props.iteration.body || '',
            placeholder: 'Start writing!',
          }}
          onChange={this.updateBody}
        /> */}
        <Editor />
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
