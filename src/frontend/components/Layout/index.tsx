import * as React from 'react'
import {UserAttributes}   from '../../../server/db/models/user'
import {GuestInstance}    from '../../../server/db/models/guest'
import {get, sendRequest} from '../../../../utils/api/responses'

interface ILayout {
  children?: Element
  user: UserAttributes|GuestInstance
}

const NavBtn = ({url, title, icon}: {url: string, title: string, icon: string}) => (
  <a href={url}>
    <button className={`pt-button pt-minimal pt-icon-${icon}`}>
      {title}
    </button>
  </a>
)

const Brand = () => (
  <div className='pt-navbar-group pt-align-left'>
    <div className='pt-navbar-heading'>
      Clarity
    </div>
  </div>
)

const LayoutComponent = ({user, children}: ILayout) => (
  <div>
    <nav style={{display: 'flow-root', marginBottom: '25px'}}>
      <Brand />
      <div className='pt-navbar-group pt-align-right'>
        <NavBtn title='Counter' url='/counter' icon='calculator' />
        <span className='pt-navbar-divider' />
        {user.username && <NavBtn title={user.username} url='/me'  icon='user' />}
        {
          user.username
          ? <NavBtn title='Sign out' url='/logout' icon='log-out' />
          : <NavBtn title='Sign in'  url='/login'  icon='log-in'  />
        }
      </div>
    </nav>

    <main>
      {children}
    </main>
  </div>
)

interface IState {
  user: UserAttributes|GuestInstance
}

export const setCurrentUser = (user: UserAttributes|GuestInstance) => (prevState: IState): IState => ({
  ...prevState,
  user,
})

class Layout extends React.Component<null, IState> {
  state = {user: new GuestInstance}

  componentDidMount () {
    sendRequest(get('/session'))
      .then((user: UserAttributes|GuestInstance) => this.setState(setCurrentUser(user)))
  }

  render () {
    return (
      <LayoutComponent user={this.state.user}>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
