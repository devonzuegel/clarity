import * as React from 'react'
const Remarkable = require('remarkable')
import * as hljs from 'highlight.js'

const styles = require('./styles.css')

const md = new Remarkable('full', {
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
})

const Markdown = (props: {text: string}) =>
  <div>
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{__html: md.render(props.text)}}
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/idea.min.css"
      rel="stylesheet"
    />
  </div>

export default Markdown
