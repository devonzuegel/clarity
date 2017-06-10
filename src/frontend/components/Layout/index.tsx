import * as React from 'react'

import {IPerson} from '~/server/db/models/person'
import {urls}    from '~/frontend/routes'


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
        <NavBtn title='Posts'         url={urls.posts}   name='document' />
        <NavBtn title='New post'      url={urls.newPost} name='plus'     />
        {
          user && user.facebookId &&
          <NavBtn title={user.facebookId} url='/me' name='user' />
        }
        <span className='pt-navbar-divider' />
        {
          user.facebookId
          ? <NavBtn title='Sign out' url={urls.signout}  name='log-out' />
          : <NavBtn title='Sign in'  url={urls.fbSignin} name='log-in'  />
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
