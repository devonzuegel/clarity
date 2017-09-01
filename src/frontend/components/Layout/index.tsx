import * as React from 'react'

import {urls} from '~/frontend/routes'
import Hotkeys from '~/frontend/components/Hotkeys'

interface ILayout {
  children?: Element
  displayName: string
  username: string
}

const s = require('./styles.css')

const NavBtn = ({url, title, name}: {url: string; title: string; name: string}) =>
  <a href={url} id={`nav--${name}`}>
    <button className={`pt-button pt-minimal ${s['nav-button']}`}>
      {title}
    </button>
  </a>

const Nav = ({displayName, username}: ILayout) =>
  <nav style={{display: 'flow-root', height: '48px'}}>
    <Hotkeys />
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
  <div className={s['top-level-wrapper']}>
    {displayName && <Nav {...{displayName, username}} />}
    <main style={{paddingBottom: '24px', paddingTop: '24px'}}>
      {children}
    </main>
  </div>

export default LayoutComponent
