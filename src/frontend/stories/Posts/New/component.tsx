import * as React from 'react'
import * as page from 'page'

import * as api from '~/frontend/api'
import Form from '~/frontend/stories/Posts/Form'
import {urls} from '~/frontend/routes'
import {IState} from '~/frontend/stories/Posts/Form/reducers'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'

type INewProps = {facebookId: string}

const reducers = {
  updateError: (error: string) => (_prevState: {error?: string}) => ({
    error,
  }),
}

class New extends React.Component<INewProps, {}> {
  state = {error: null}

  render() {
    const onSubmit = async (newState: IState) => {
      try {
        await api.newPost({...newState, facebookId: this.props.facebookId})
        page.redirect(urls.posts)
      } catch (e) {
        this.setState(reducers.updateError(e))
      }
    }
    return (
      <div>
        {this.state.error &&
          <ErrorMessage msg={this.state.error} id="new-post-user-msg" />}
        <Form iteration={{}} onSubmit={onSubmit} buttonText="Create" />
      </div>
    )
  }
}

export default New
