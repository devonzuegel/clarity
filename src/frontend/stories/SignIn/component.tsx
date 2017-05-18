import * as R     from 'ramda'
import * as React from 'react'
import {Button, Intent, Spinner} from '@blueprintjs/core'
import * as page from 'page'
import {IPerson} from '~/server/db/models/person'
import {post, get, sendRequest} from '../../../../utils/api/responses'

import {Field}        from '~/frontend/components/Field'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {IActions}     from '~/frontend/redux/actions/signIn'
import {urls}         from '~/frontend/routes'

import {updateUsername, setError, beginSubmit, endSubmit, removeError} from './reducers'
import {IState}      from './IState'
import {IConstraint} from './IConstraint'

class SignIn extends React.Component<{actions: IActions}, IState> {
  state = {
    username:        '',
    submitting:      undefined,
    errorMsg:        null,
    submitAttempted: false,
  }

  private updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(updateUsername(e.currentTarget.value))
  }

  componentWillMount () {
    sendRequest(get('/api/session'))
      .then((u: IPerson) => this.props.actions.setUsername(u.username))
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

  private signupSuccess = (_: IPerson) => {
    this.props.actions.setUsername(this.state.username)
    this.setState(removeError)
    this.setState(endSubmit)
    page.redirect(urls.me)
  }

  private signupFailure = (error: {message: string}) => {
    this.setState(setError(error.message || 'Sorry, there has been a technical issue'))
    this.setState(endSubmit)
  }

  private submit = (action: 'signup'|'signin') => () => {
    this.setState(beginSubmit(action))
    setTimeout(() => {
      if (!this.validate()) {
        return this.setState(endSubmit)
      }
      sendRequest(post(`/api/${action}?username=${this.state.username}`))
        .then(this.signupSuccess)
        .catch(this.signupFailure)
    }, 500)
  }

  render () {
    return (
      <div style={{display: 'block'}}>
        <h2>
          Welcome!
        </h2>

        <br/>

        {
          this.state.submitAttempted && this.state.errorMsg &&
          <ErrorMessage msg={this.state.errorMsg} id='signin-form__errors' />
        }

        <Field
          label      ='Hi! Who are you?'
          placeholder='Username'
          value      ={this.state.username}
          onChange   ={this.updateUsername}
          id         ='signin-form__username'
        />

        <Button
          intent  ={Intent.PRIMARY}
          onClick ={this.submit('signup')}
          disabled={!!this.state.submitting}
          id      ='signin-form__signup-button'
          style   ={{width: '100px', marginRight: '12px'}}
         >
          {
            this.state.submitting === 'signup'
            ? <Spinner className='pt-small' />
            : 'Sign up'
          }
        </Button>
        <Button
          intent  ={Intent.NONE}
          onClick ={this.submit('signin')}
          disabled={!!this.state.submitting}
          id      ='signin-form__signin-button'
          style   ={{width: '100px'}}
         >
          {
            this.state.submitting === 'signin'
            ? <Spinner className='pt-small' />
            : 'Sign in'
          }
        </Button>
      </div>
    )
  }
}

export default SignIn
