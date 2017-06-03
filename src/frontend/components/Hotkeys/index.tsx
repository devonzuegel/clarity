import * as React     from 'react'
import * as Blueprint from '@blueprintjs/core'
import * as page      from 'page'

import {urls} from '~/frontend/routes'


const hotkeys = [
  {
    global:    true,
    combo:     'N',
    label:     'New post',
    onKeyDown: () => page.redirect(urls.newPost),
  },
]

@Blueprint.HotkeysTarget
class Hotkeys extends React.Component<{}, {}> {
  public renderHotkeys() {
    return (
      <Blueprint.Hotkeys>
        {hotkeys.map((hotkey, k) => (
          <Blueprint.Hotkey {...hotkey} key={k} />
        ))}
      </Blueprint.Hotkeys>
    )
  }

  render () {
    return null
  }
}

export default Hotkeys
