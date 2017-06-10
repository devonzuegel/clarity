import * as R         from 'ramda'
import * as React     from 'react'
import * as Blueprint from '@blueprintjs/core'
import * as page      from 'page'

import {IPerson} from '~/server/db/models/person'

import {Field}        from '~/frontend/components/Field'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {IActions}     from '~/frontend/redux/actions/signIn'
import {urls}         from '~/frontend/routes'
import * as api       from '~/frontend/api'

import * as reducers from './reducers'
import {IState}      from './IState'
import {IConstraint} from './IConstraint'

class SignIn extends React.Component<{actions: IActions}, IState> {
  state = {
    facebookId:        '',
    submitting:      undefined,
    errorMsg:        null,
    submitAttempted: false,
  }

  private updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(reducers.updateUsername(e.currentTarget.value))
  }

  componentWillMount () {
    api.getSession()
      .then((u: IPerson) => this.props.actions.setUsername(u.facebookId))
  }

  private constraints: IConstraint[] = [
    {
      value:    () => this.state.facebookId,
      isValid:  (facebookId: string) => !R.isEmpty(facebookId),
      errorMsg: 'Your facebookId cannot be empty.',
    },
  ]

  private validate = (): boolean => {
    let formIsValid = true
    this.constraints.map((constraint: IConstraint) => {
      const value = constraint.value()
      if (!constraint.isValid(value)) {
        this.setState(reducers.setError(constraint.errorMsg))
        formIsValid = false
      }
    })
    return formIsValid
  }

  private signupSuccess = (_: IPerson) => {
    this.props.actions.setUsername(this.state.facebookId)
    this.setState(reducers.removeError)
    this.setState(reducers.endSubmit)
    page.redirect(urls.me)
  }

  private signupFailure = (error: {message: string}) => {
    this.setState(reducers.setError(error.message || 'Sorry, there has been a technical issue'))
    this.setState(reducers.endSubmit)
  }

  private submit = (action: 'signup'|'signin') => () => {
    this.setState(reducers.beginSubmit(action))
    setTimeout(() => {
      if (!this.validate()) {
        return this.setState(reducers.endSubmit)
      }
      api.signupOrSignin(action, this.state.facebookId)
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
          label      ='Username'
          placeholder='Hi! Who are you?'
          value      ={this.state.facebookId}
          onChange   ={this.updateUsername}
          id         ='signin-form__facebookId'
        />

        <Blueprint.Button
          intent  ={Blueprint.Intent.PRIMARY}
          onClick ={this.submit('signup')}
          disabled={!!this.state.submitting}
          id      ='signin-form__signup-button'
          style   ={{width: '100px', marginRight: '12px'}}
         >
          {
            this.state.submitting === 'signup'
            ? <Blueprint.Spinner className='pt-small' />
            : 'Sign up'
          }
        </Blueprint.Button>
        <Blueprint.Button
          intent  ={Blueprint.Intent.NONE}
          onClick ={this.submit('signin')}
          disabled={!!this.state.submitting}
          id      ='signin-form__signin-button'
          style   ={{width: '100px'}}
         >
          {
            this.state.submitting === 'signin'
            ? <Blueprint.Spinner className='pt-small' />
            : 'Sign in'
          }
        </Blueprint.Button>
      </div>
    )
  }
}

export default SignIn
