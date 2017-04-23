import * as React from 'react'
import {UserAttributes} from '../../../server/db/models/user'

interface ILayout {
  user?: UserAttributes
  children?: Element
}

const NavBtn = ({url, title, icon}: {url: string, title: string, icon: string}) => (
  <a href={url}>
    <button className={`pt-button pt-minimal pt-icon-${icon}`}>
      {title}
    </button>
  </a>
)

export default ({user, children}: ILayout) => (
  <div>
    <nav style={{display: 'flow-root', marginBottom: '25px'}}>
      <div className='pt-navbar-group pt-align-left'>
        <div className='pt-navbar-heading'>
          Clarity
        </div>
      </div>

      <div className='pt-navbar-group pt-align-right'>
        <NavBtn title='Counter' url='/counter' icon='calculator' />
        <span className='pt-navbar-divider' />
        {
          user
          ? <NavBtn title={user.username} url='/me'     icon='user'   />
          : <NavBtn title='Sign in'       url='/signin' icon='log-in' />
        }
      </div>
    </nav>

    <main>
      {children}
    </main>
  </div>
)
