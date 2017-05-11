import * as React from 'react'
import {IPerson}   from '~/server/db/models/person'
import {urls} from '~/frontend/routes'


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
        <NavBtn title='Counter' url={urls.counter} name='calculator' />
        <NavBtn title='Posts'   url={urls.posts}   name='note' />
        <span className='pt-navbar-divider' />
        {user.username && <NavBtn title={user.username} url='/me'  name='user' />}
        {
          user.username
          ? <NavBtn title='Sign out' url={urls.signout} name='sign-out' />
          : <NavBtn title='Sign in'  url={urls.signin}  name='sign-in'  />
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
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
