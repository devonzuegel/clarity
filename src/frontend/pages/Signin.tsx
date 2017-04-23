import * as React from 'react'
import {UserAttributes} from '../../server/db/models/user'

import Layout from '~/frontend/components/Layout'
import Signin from '~/frontend/stories/Signin'

class SigninPage extends React.Component<null, {user: UserAttributes|undefined}> {
  render() {
    return (
      <Layout>
        <Signin />
      </Layout>
    )
  }
}

export default SigninPage
