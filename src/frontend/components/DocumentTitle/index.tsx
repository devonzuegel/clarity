import * as React from 'react'

type IProps = {
  overrideFormat?: boolean
  title?: string
}

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

export default DocumentTitle
