import * as React from 'react'

import { EditableText } from '@blueprintjs/core'

export default () => (
  <div>
    <h2>
      And now a nice little <code>EditableText</code> Element
    </h2>

    <EditableText
      multiline
      minLines={3}
      maxLines={6}
      onConfirm={(val: string) => alert(`You just submitted: "${val}"`)}
    />
  </div>
)
