import * as R     from 'ramda'
import * as React from 'react'
import {Button, Intent, Spinner} from '@blueprintjs/core'
import * as page from 'page'
import {IPerson} from '~/server/db/models/person'
import {post, get, sendRequest} from '../../../../utils/api/responses'

import {Field}        from '~/frontend/components/Field'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {IActions}     from '~/frontend/redux/actions/signIn'

import {updateUsername, setError, beginSubmit, endSubmit, removeError} from './reducers'
import {IState}      from './IState'
import {IConstraint} from './IConstraint'

class SignIn extends React.Component<{actions: IActions}, IState> {
  state = {
    username:        '',
    submitting:      false,
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
    page.redirect('/counter')
  }

  private signupFailure = (error: {message: string}) => {
    this.setState(setError(error.message || 'Sorry, there has been a technical issue'))
    this.setState(endSubmit)
  }

  private onSubmit = () => {
    this.setState(beginSubmit)
    setTimeout(() => {
      if (!this.validate()) {
        return this.setState(endSubmit)
      }
      sendRequest(post(`/api/signup?username=${this.state.username}`))
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
          <ErrorMessage msg={this.state.errorMsg} id='signup-form__errors' />
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

export default SignIn
