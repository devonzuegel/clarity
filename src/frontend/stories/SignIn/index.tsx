import * as classnames from 'classnames'
import * as React from 'react'
import * as page from 'page'
import * as Blueprint from '@blueprintjs/core'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as U from '~/../utils/models'
import {actions, IActions} from '~/frontend/redux/actions/auth'
import * as api from '~/frontend/api'
import {urls} from '~/frontend/routes'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'

const s = require('~/frontend/stories/SignIn/styles.css')

type IState = {
  settingUsername: boolean
  user: {facebookId: string}
  username: string
  error?: string
  failedAttempts: U.StrObject
  available: boolean
}

class SignIn extends React.Component<{actions: IActions}, IState> {
  state = {
    settingUsername: false,
    user: {facebookId: ''},
    username: '',
    error: undefined,
    failedAttempts: {} as U.StrObject,
    available: false, // TODO: check if current value is available, cache it
  }
  componentDidMount() {
    api
      .getProfile()
      .then(({profile, user}) => {
        this.props.actions.signIn(profile.id, profile.displayName)
        if (user.username) {
          page.redirect(urls.user(user.username))
        } else {
          this.setState({settingUsername: true, user}) // TODO: extract reducer
        }
      })
      .catch(() => page.redirect(urls.signIn))
  }

  private updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
    const updatedUsername = e.currentTarget.value
    this.setState({username: updatedUsername})
    this.setState({error: this.state.failedAttempts[updatedUsername]}) // TODO
  }

  private submit = () => {
    api
      .setUsername(this.state.user.facebookId, this.state.username)
      .then(username => {
        this.props.actions.setUsername(this.state.username)
        page.redirect(urls.user(username))
      })
      .catch(e => {
        this.setState({
          error: e.message,
          failedAttempts: {
            ...this.state.failedAttempts,
            [this.state.username]: e.message,
          },
        }) // TODO: reducer
        // TODO: cache associated error msg from server, instead of re-defining in updateUsername
      })
  }

  render() {
    if (this.state.settingUsername) {
      const isValidFormat = true // TODO
      return (
        <div className={s['set-username']}>
          <div style={{maxWidth: '375px'}}>
            <h5>
              Finish creating your Clarity account
            </h5>
            <div
              className={`pt-form-group ${this.state.error && 'pt-intent-danger'}`}
            >
              <Blueprint.InputGroup
                autoFocus
                rightElement={
                  this.state.error
                    ? <Blueprint.Tag className={s['icon-tag']}>
                        <span className="pt-icon-standard pt-intent-danger pt-icon-cross" />
                      </Blueprint.Tag>
                    : this.state.available
                      ? <Blueprint.Tag className={s['icon-tag']}>
                          <span className="pt-icon-standard pt-intent-success pt-icon-tick" />
                        </Blueprint.Tag>
                      : undefined
                }
                placeholder="username"
                value={this.state.username}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.keyCode === 13) {
                    this.submit()
                  }
                }}
                className={classnames({
                  [s['fill']]: true,
                  [s['no-error']]: !this.state.error,
                  ['pt-intent-danger']: Boolean(this.state.error),
                })}
                onChange={this.updateUsername}
                id="set-username__username"
              />
              <div className={`pt-form-helper-text ${s['helper-text']}`}>
                {this.state.error}
              </div>
            </div>

            <Blueprint.Button
              intent={Blueprint.Intent.PRIMARY}
              onClick={this.submit}
              className="pt-fill"
              disabled={!isValidFormat}
              id="set-username__button"
            >
              Continue
            </Blueprint.Button>
          </div>
        </div>
      )
    }
    return <LoadingOverlay />
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn as any)
