import * as React from 'react'
import * as R from 'ramda'
import { Button, Intent, Spinner } from '@blueprintjs/core'
import * as page from 'page'

import {UserAttributes} from '../../../server/db/models/user'
import {post, sendRequest} from '../../../../utils/api/responses'

import { Field } from '~/frontend/components/Field'
import { updateUsername, beginSubmit, endSubmit, setError, removeError } from './reducers'
import { IState } from './IState'
import { IConstraint } from './IConstraint'

const ValidationMsgBox = ({msg}: {msg: string|null}) => (
  <div>
    <div className='pt-callout pt-intent-danger' id='signup-form__errors'>
      {msg}
    </div>
    <br />
  </div>
)

export default class Signup extends React.Component<null, IState> {
  state: IState = {
    username: '',
    submitting: false,
    errorMsg: null,
    submitAttempted: false,
  }

  private updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(updateUsername(e.currentTarget.value))
  }

  private constraints: IConstraint[] = [
    {
      value:    () => this.state.username,
      isValid:  (username: string) => !R.isEmpty(username),
      errorMsg: 'Your username cannot be empty.',
    },
  ]

  private validate = (): boolean => {
    let formIsValid = true
    this.constraints.map((constraint: IConstraint) => {
      const value = constraint.value()
      if (!constraint.isValid(value)) {
        this.setState(setError(constraint.errorMsg))
        formIsValid = false
      }
    })
    return formIsValid
  }

  private onSubmit = () => {
    this.setState(beginSubmit)
    setTimeout(() => {
      if (!this.validate()) {
        this.setState(endSubmit)
      } else {
        sendRequest(post(`/signup?username=${this.state.username}`))
          .then((_: UserAttributes) => {
            this.setState(removeError)
            this.setState(endSubmit)
            page.redirect('/counter')
          })
          .catch((error) => {
            this.setState(setError(error.message || 'Sorry, there has been a technical issue'))
            this.setState(endSubmit)
          })
      }
    }, 500)
  }

  render () {
    return (
      <div style={{display: 'block'}}>
        <h2>
          Welcome!
        </h2>

        <br />

        {
          this.state.submitAttempted && this.state.errorMsg &&
          <ValidationMsgBox msg={this.state.errorMsg} />
        }

        <Field
          label      ='Hi! Who are you?'
          placeholder='Username'
          value      ={this.state.username}
          onChange   ={this.updateUsername}
          onSubmit   ={this.onSubmit}
          id         ='signup-form__username'
        />

        <Button
          intent ={Intent.PRIMARY}
          onClick={this.onSubmit}
          id     ='signup-form__submit'
          style  ={{width: '100px'}}
         >
          {
            this.state.submitting
            ? <Spinner className='pt-small' />
            : 'Submit'
          }
        </Button>

      </div>
    )
  }
}
