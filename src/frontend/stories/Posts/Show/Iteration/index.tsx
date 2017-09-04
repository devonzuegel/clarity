import * as React from 'react'

import * as U from '~/../utils/date.ts'
import {IterationSchema} from '~/server/db/models/iteration'
import Markdown from '~/frontend/components/Markdown'
import DocumentTitle from '~/frontend/components/DocumentTitle'

const Show = (iteration: IterationSchema) =>
  <DocumentTitle title={iteration.title}>
    <h1 id="iteration-title">
      {iteration.title}
    </h1>

    <h6>
      {iteration.createdAt && U.formatDateStr(iteration.createdAt)}
    </h6>

    <div id="iteration-body">
      {iteration.body && <Markdown text={iteration.body} />}
    </div>
  </DocumentTitle>

export default Show
