import * as React from 'react'
import {IPerson}   from '~/server/db/models/person'

interface ILayout {
  children?: Element
  user: IPerson
}

const NavBtn = ({url, title, name}: {url: string, title: string, name: string}) => (
  <a href={url} id={`nav--${name}`}>
    <button className={`pt-button pt-minimal pt-icon-${name}`}>
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
        <NavBtn title='Counter' url='/counter' name='calculator' />
        <span className='pt-navbar-divider' />
        {user.username && <NavBtn title={user.username} url='/me'  name='user' />}
        {
          user.username
          ? <NavBtn title='Sign out' url='/signout' name='log-out' />
          : <NavBtn title='Sign in'  url='/signin'  name='log-in'  />
        }
      </div>
    </nav>

    <main>
      {children}
    </main>
  </div>
)

interface IState {
  user: IPerson
}

export const setCurrentUser = (user: IPerson) => (prevState: IState): IState => ({
  ...prevState,
  user,
})

class Layout extends React.Component<ILayout, IState> {
  render () {
    return (
      <LayoutComponent user={this.props.user}>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
