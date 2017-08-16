import * as React from 'react'
const Remarkable = require('remarkable')
import * as hljs from 'highlight.js'

import * as U from '~/../utils/date.ts'
import {IterationSchema} from '~/server/db/models/iteration'

const styles = require('./styles.css')

const Show = (iteration: IterationSchema) =>
  <div>
    <h1 id="iteration-title">
      {iteration.title}
    </h1>

    <h6>
      {iteration.createdAt && U.formatDateStr(iteration.createdAt)}
    </h6>

    <div id="iteration-body">
      {iteration.body &&
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{
            __html: new Remarkable({
              html: true,
              linkify: true,
              typographer: true,
              highlight: (str: string, lang: string) => {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return hljs.highlight(lang, str).value
                  } catch (err) {}
                }

                try {
                  return hljs.highlightAuto(str).value
                } catch (err) {}

                return '' // use external default escaping
              },
            }).render(iteration.body),
          }}
        />}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/idea.min.css"
        rel="stylesheet"
      />
    </div>
  </div>

export default Show
