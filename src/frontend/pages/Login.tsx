import * as React from 'react'
import {UserAttributes} from '../../server/db/models/user'

import Layout from '~/frontend/components/Layout'
import Login from '~/frontend/stories/Login'

class LoginPage extends React.Component<null, {user: UserAttributes|undefined}> {
  render() {
    return (
      <Layout>
        <Login />
      </Layout>
    )
  }
}

export default LoginPage
