import * as React from 'react'

export const NoPosts = ({username}: {username?: string}) =>
  <div id="not-found" className="pt-non-ideal-state" style={{maxHeight: '45%'}}>
    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
      <span className="pt-icon pt-icon-moon" />
    </div>
    <h4 className="pt-non-ideal-state-title">
      No posts to display
    </h4>
    {username &&
      <div className="pt-non-ideal-state-description">
        <b>{username}</b> hasn't published anything yet!
      </div>}
  </div>
