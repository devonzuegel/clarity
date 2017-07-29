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

const Brand = () =>
  <div className="pt-navbar-group pt-align-left">
    <div className="pt-navbar-heading">
      Clarity
    </div>
  </div>

const LayoutComponent = ({displayName, username, children}: ILayout) =>
  <div>
    <nav style={{display: 'flow-root', height: '48px', marginBottom: '25px'}}>
      <Brand />
      <div className="pt-navbar-group pt-align-right">
        {displayName &&
          <div>
            <NavBtn title="New post" url={urls.newPost} name="plus" />
            <NavBtn title={displayName} url={urls.user(username)} name="user" />
            <span className="pt-navbar-divider" />
          </div>}
        {displayName
          ? <NavBtn title="Sign out" url={urls.signout} name="log-out" />
          : <NavBtn title="Sign in" url={urls.fbSignin} name="log-in" />}
      </div>
    </nav>

    <main>
      {children}
    </main>
  </div>

export default LayoutComponent
