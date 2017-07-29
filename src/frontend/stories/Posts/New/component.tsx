import * as React from 'react'
import * as page from 'page'

import * as api from '~/frontend/api'
import Form from '~/frontend/stories/Posts/Form'
import {urls} from '~/frontend/routes'
import {IState} from '~/frontend/stories/Posts/Form/reducers'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {IAction} from '~/frontend/redux/actions/auth'

export type INewProps = {
  facebookId: string;
  username: string;
  actions: {setUsername(username: string): IAction};
}

const reducers = {
  updateError: (error: string) => (_prevState: {error?: string}) => ({
    error,
  }),
}

class New extends React.Component<INewProps, {}> {
  state = {error: null}

  onSubmit = async (newState: IState) => {
    try {
      await api.newPost({...newState, facebookId: this.props.facebookId})
      page.redirect(urls.user(this.props.username))
    } catch (e) {
      this.setState(reducers.updateError(e))
    }
  }

  render() {
    console.log(JSON.stringify(this.props))
    return (
      <div>
        {this.state.error &&
          <ErrorMessage msg={this.state.error} id="new-post-user-msg" />}
        <Form iteration={{}} onSubmit={this.onSubmit} buttonText="Create" />
      </div>
    )
  }
}

export default (props: INewProps) => <New {...props} />
