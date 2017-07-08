import * as React from 'react'

const Grid = ({items}: {items: any[]}) =>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '30%',
      minWidth: '380px',
      alignItems: 'center',
    }}
  >
    {items.map((item: any, i: number) =>
      <div style={{width: '32%', textAlign: 'center'}} key={i}>
        {item}
      </div>
    )}
  </div>

export default Grid
