import * as React from 'react'

import {urls} from '~/frontend/routes'


interface ILayout {
  children?: Element
  displayName: string
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

const LayoutComponent = ({displayName, children}: ILayout) => (
  <div>
    <nav style={{display: 'flow-root', marginBottom: '25px'}}>
      <Brand />
      <div className='pt-navbar-group pt-align-right'>
        <NavBtn title='Posts'         url={urls.posts}   name='document' />
        <NavBtn title='New post'      url={urls.newPost} name='plus'     />
        {
          displayName &&
          <NavBtn title={displayName} url='/me' name='user' />
        }
        <span className='pt-navbar-divider' />
        {
          displayName
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
  facebookId: string
}

export const setCurrentUser = (facebookId: string) => (prevState: IState): IState => ({
  ...prevState,
  facebookId,
})

class Layout extends React.Component<ILayout, IState> {
  render () {
    return (
      <LayoutComponent displayName={this.props.displayName}>
        {this.props.children}
      </LayoutComponent>
    )
  }
}

export default Layout
