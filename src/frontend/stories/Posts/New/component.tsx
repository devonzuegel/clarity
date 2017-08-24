import * as React from 'react'
import * as page from 'page'

import * as api from '~/frontend/api'
import Form from '~/frontend/stories/Posts/Form'
import {urls} from '~/frontend/routes'
import {IFormState} from '~/frontend/stories/Posts/Form/reducers'
import {ErrorMessage} from '~/frontend/components/ErrorMessage'
import {IAction} from '~/frontend/redux/actions/auth'
import {Field} from '~/frontend/components/Field'
import Layout from '~/frontend/stories/Layout'

export type IProps = {
  facebookId: string
  username: string
  actions: {setUsername(username: string): IAction}
}

type IState = {error?: string; slug?: string}

const reducers = {
  updateError: (error: string) => (prevState: IState): IState => ({
    ...prevState,
    error,
  }),
  updateSlug: (slug: string) => (prevState: IState): IState => ({
    ...prevState,
    slug,
  }),
}

class New extends React.Component<IProps, IState> {
  state = {error: undefined, slug: undefined}

  onSubmit = async (formState: IFormState) => {
    try {
      // The slug must be either undefined or a non-empty string
      const slug = this.state.slug === '' ? undefined : this.state.slug
      await api.newPost({
        ...formState,
        facebookId: this.props.facebookId,
        slug,
      })
      page.redirect(urls.user(this.props.username))
    } catch (e) {
      this.setState(reducers.updateError(e || 'Sorry, something went wrong.'))
    }
  }

  private updateSlug = (e: React.FormEvent<HTMLInputElement>) => {
    const slug = e.currentTarget.value
    if (/^[a-z0-9-_]*$/.test(slug)) {
      this.setState(reducers.updateSlug(slug))
    }
  }

  render() {
    return (
      <Layout>
        {this.state.error &&
          <ErrorMessage msg={this.state.error} id="new-post--user-msg" />}
        <Form iteration={{}} onSubmit={this.onSubmit} buttonText="Create" />
        <br />
        <p>
          Story link after publishing: &nbsp;
          <code>
            thoughts.devonzuegel.com/@{this.props.username}/{this.state.slug || 'auto-generated'}
          </code>
        </p>
        <div style={{maxWidth: '60%'}}>
          <Field
            value={this.state.slug || ''}
            label=""
            onChange={this.updateSlug}
            id="new-post--slug"
          />
        </div>
      </Layout>
    )
  }
}

export default (props: IProps) => <New {...props} />
