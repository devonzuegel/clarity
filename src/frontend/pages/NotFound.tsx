import * as React from 'react'

import Wrapper from '~/frontend/components/Wrapper'

const NotFound = ({message}: {message?: string}) =>
  <Wrapper>
    <div id="not-found" className="pt-non-ideal-state" style={{maxHeight: '45%'}}>
      <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
        <span className="pt-icon pt-icon-error" />
      </div>
      <h4 className="pt-non-ideal-state-title">404</h4>
      <div className="pt-non-ideal-state-description">
        {message || 'Nothing to see here'}
      </div>
    </div>
  </Wrapper>

export default NotFound
