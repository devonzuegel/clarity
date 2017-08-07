import * as React from 'react'
import {connect} from 'react-redux'

import ShowPost from '~/frontend/stories/Posts/Show'

const Page = (props: {slug: string; readonly: boolean}) => <ShowPost {...props} />

const mapStateToProps = (state: {authReducer: {user?: any}}) => ({
  readonly: !state.authReducer.user,
})

const mergeProps = (
  stateProps: {readonly: boolean},
  _: any,
  ownProps: {slug: string}
): {slug: string; readonly?: boolean} => ({
  ...stateProps,
  ...ownProps,
})

export default connect(mapStateToProps, () => ({}), mergeProps)(Page)
