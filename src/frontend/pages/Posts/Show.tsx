import * as React from 'react'
import {connect} from 'react-redux'

import ShowPost, {IProps} from '~/frontend/stories/Posts/Show'
import Layout from '~/frontend/stories/Layout'

const Page = (props: IProps) =>
  <Layout>
    <ShowPost {...props} />
  </Layout>

const mapStateToProps = (state: {authReducer: {user?: any}}) => ({
  readonly: !state.authReducer.user,
})

const mergeProps = (
  stateProps: {readonly: boolean},
  _: any,
  ownProps: {slug: string; username: string}
): {slug: string; readonly?: boolean; username: string} => ({
  ...stateProps,
  ...ownProps,
})

export default connect(mapStateToProps, () => ({}), mergeProps)(Page)
