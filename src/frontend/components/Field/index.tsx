import * as React from 'react'
import * as classnames from 'classnames'

interface IField {
  value: string
  label: string
  placeholder?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onSubmit?: Function
  id: string
  className?: string
  danger?: boolean
}

export const Field = ({
  value,
  onChange,
  label,
  onSubmit,
  placeholder,
  id,
  className,
  danger,
}: IField) => {
  const classes = classnames({
    ['pt-input']: true,
    ['pt-fill']: true,
    [`${className}`]: Boolean(className),
    ['pt-intent-danger']: danger,
  })
  return (
    <label className="pt-label pt-text-muted" style={{width: '100%'}}>
      {label}
      <input
        className={classes}
        type="text"
        value={value}
        id={id}
        onChange={onChange}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (onSubmit && e.keyCode === 13) {
            onSubmit()
          }
        }}
        placeholder={placeholder || label}
      />
    </label>
  )
}
