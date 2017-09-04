import * as React from 'react'
const sideEffect = require('react-side-effect')

type IProps = {
  overrideFormat?: boolean
  title?: string
}

/**
 * <DocumentTitle /> sets the title for a page.
 *  - Default page title:        "Clarity"
 *  - Default page title format: "Page name – Clarity"
 *  - Override page title:       "Page name"
 */
class DocumentTitle extends React.Component<IProps, {}> {
  private defaultTitle = 'Clarity'

  private format = (t: string) => `${t} – ${this.defaultTitle}`

  componentDidMount() {
    if (this.props.overrideFormat && this.props.title === undefined) {
      throw Error(
        'You must either provide a title or default to the provided format'
      )
    }
  }

  setTitle() {
    if (this.props.title !== undefined) {
      if (this.props.overrideFormat) {
        document.title = this.props.title
      } else {
        document.title = this.format(this.props.title)
      }
    } else {
      document.title = this.defaultTitle
    }
  }

  render() {
    this.setTitle()

    if (this.props.children) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }

    return null
  }
}

const reducePropsToState = (propsList: any[]) => {
  const innermostProps = propsList[propsList.length - 1]
  if (innermostProps) {
    return innermostProps.title
  }
}

const handleStateChangeOnClient = (title: string) => {
  const nextTitle = title || ''
  if (nextTitle !== document.title) {
    document.title = nextTitle
  }
}

const globalSideEffect = sideEffect(reducePropsToState, handleStateChangeOnClient)

export default globalSideEffect(DocumentTitle)
