import * as React from 'react'

const Wrapper = ({ content }: { content: JSX.Element }) => (
  <div style={{padding: '20px 50px', margin: 'auto', maxWidth: '950px'}}>
    {content}
  </div>
)

export default Wrapper
