import * as React from 'react'

import {urls} from '~/frontend/routes'

interface ILayout {
  children?: Element
  displayName: string
  username: string
}

const NavBtn = ({url, title, name}: {url: string; title: string; name: string}) =>
  <a href={url} id={`nav--${name}`}>
    <button className={`pt-button pt-minimal pt-icon-${name}`}>
      {title}
    </button>
  </a>

const Nav = ({displayName, username}: ILayout) =>
  <nav style={{display: 'flow-root', height: '48px'}}>
    <div className="pt-navbar-group pt-align-right">
      <div>
        <NavBtn title="New post" url={urls.newPost} name="plus" />
        <NavBtn title={displayName} url={urls.user(username)} name="user" />
        <span className="pt-navbar-divider" />
      </div>
      <NavBtn title="Sign out" url={urls.signout} name="log-out" />
    </div>
  </nav>

const LayoutComponent = ({displayName, username, children}: ILayout) =>
  <div>
    {displayName && <Nav {...{displayName, username}} />}
    <main style={{paddingBottom: '24px', marginTop: '24px'}}>
      {children}
    </main>
  </div>

export default LayoutComponent
