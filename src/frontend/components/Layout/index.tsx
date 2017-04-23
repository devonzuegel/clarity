import * as React from 'react'
import {UserAttributes} from '../../../server/db/models/user'

interface ILayout {
  user?: UserAttributes
  children?: Element
}

export default ({user, children}: ILayout) => (
  <div>
    <nav style={{display: 'flow-root', marginBottom: '25px'}}>
      <div className='pt-navbar-group pt-align-left'>
        <div className='pt-navbar-heading'>Clarity</div>
      </div>
      <div className='pt-navbar-group pt-align-right'>
        {
          user
          ?
          <button className='pt-button pt-minimal pt-icon-user'>
            {user.username}
          </button>
          :
          <a href='/signin'>
            <button className='pt-button pt-minimal pt-icon-log-in'>
              Sign in
            </button>
          </a>
        }
      </div>
    </nav>

    <main>
      {children}
    </main>
  </div>
)
