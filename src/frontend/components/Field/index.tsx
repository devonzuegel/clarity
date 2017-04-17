import * as React from 'react'

interface IField {
  value: string
  label: string
  placeholder?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onSubmit: Function
  id: string
}

export const Field = ({value, onChange, label, onSubmit, placeholder, id}: IField) => (
  <label className='pt-label pt-text-muted'>
    {label}
    <input
      className  ='pt-input'
      type       ='text'
      value      ={value}
      id         ={id}
      onChange   ={onChange}
      onKeyUp    ={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
          onSubmit()
        }
      }}
      placeholder={placeholder || label}
     />
  </label>
)
