import * as React from 'react'

import Wrapper from '~/frontend/components/Wrapper'
import {urls} from '~/frontend/routes'
const styles = require('./styles.css')

interface ILayout {
  children?: JSX.Element
  displayName: string
  username: string
  wrapper?: boolean
}

const NavBtn = ({url, title, name}: {url: string; title: string; name: string}) =>
  <a href={url} id={`nav--${name}`}>
    <button className={`pt-button pt-minimal pt-icon-${name}`}>
      {title}
    </button>
  </a>

const Nav = ({displayName, username}: ILayout) =>
  <div className={styles['nav-wrapper']}>
    <nav className={styles.nav}>
      <div className="pt-navbar-group pt-align-right">
        <div>
          <NavBtn title="New post" url={urls.newPost} name="plus" />
          <NavBtn title={displayName} url={urls.user(username)} name="user" />
          <span className="pt-navbar-divider" />
        </div>
        <NavBtn title="Sign out" url={urls.signout} name="log-out" />
      </div>
    </nav>
  </div>

const LayoutComponent = ({displayName, username, children, wrapper}: ILayout) =>
  <div>
    {displayName && <Nav {...{displayName, username}} />}
    <main className={styles.main}>
      {wrapper && children ? <Wrapper content={children} /> : children}
    </main>
  </div>

export default LayoutComponent
