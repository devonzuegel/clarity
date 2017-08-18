import * as React from 'react'
import * as R from 'ramda'
import * as Blueprint from '@blueprintjs/core'
const TextArea = require('react-textarea-autosize').default

// import MarkdownEditor from '~/frontend/components/MarkdownEditor'
import {Panes, Pane, PaneSpacer} from '~/frontend/components/Panes'
import Editor from '~/frontend/components/Editor'
import {Field} from '~/frontend/components/Field'
import {dasherize} from '~/../utils/test/string'

import * as reducers from './reducers'
const styles = require('./styles.css')

type IFormProps = {
  iteration: {title?: string; body?: string}
  onSubmit: (i: reducers.IFormState) => void
  buttonText: string
}

class Form extends React.Component<IFormProps, reducers.IFormState> {
  state = {
    title: this.props.iteration.title || '',
    subtitle: '',
    body: this.props.iteration.body || '',
  }

  submit = () => this.props.onSubmit(this.state)

  private updateTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState(reducers.updateTitle(e.currentTarget.value))
  }

  private updateSubtitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateSubtitle(e.currentTarget.value))
  }

  // private updateBody = (s: string) => {
  //   this.setState(reducers.updateBody(s))
  // }

  render() {
    const formId = `post-form--${dasherize(this.props.buttonText)}`

    const emptyField = R.contains('', [this.state.title, this.state.body])

    const hasNotBeenUpdated =
      this.state.title === this.props.iteration.title &&
      this.state.body === this.props.iteration.body

    const isValid = R.not(hasNotBeenUpdated || emptyField)

    return (
      <div id={formId} style={{paddingTop: '48px'}}>
        <PaneSpacer />

        <div
          style={{minHeight: '48px', paddingBottom: '12px', marginBottom: '-4px'}}
        >
          <Panes>
            <Pane noScroll>
              <TextArea
                className={`${styles.title} ${styles.input}`}
                placeholder="Title"
                value={this.state.title}
                onChange={this.updateTitle}
                id={`${formId}__title`}
              />
            </Pane>
            <Pane noScroll>
              <h1 className={styles['md-title']}>
                {this.state.title}
              </h1>
            </Pane>
          </Panes>

        </div>

        <div style={{height: '32px', marginTop: '-12px'}}>
          <Panes fill>
            <Pane noScroll>
              <TextArea
                label=""
                className={`${styles.subtitle} ${styles.input}`}
                placeholder="Subtitle (optional)"
                value={this.state.subtitle}
                onChange={this.updateSubtitle}
                id={`${formId}__subtitle`}
              />
            </Pane>
            <Pane noScroll>
              <h2 className={styles['md-subtitle']}>
                {this.state.subtitle}
              </h2>
            </Pane>
          </Panes>
        </div>

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
      /* <MarkdownEditor
          options={{
            initialValue: this.props.iteration.body || '',
            placeholder: 'Start writing!',
          }}
          onChange={this.updateBody}
        /> */
    )
  }
}

export default Form
