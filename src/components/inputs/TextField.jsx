import React from 'react'
import { useField } from 'formik'
import { cn } from '../../utils/format'

const sizes = {
  small: {
    label: 'text-sm',
    input: 'py-1 px-3',
  },
  normal: {
    label: 'text-base',
    input: 'py-2 px-4',
  },
  large: {
    label: 'text-lg',
    input: 'py-3 px-5'
  },
}

const TextField = React.forwardRef((props, ref) => {
  const { 
    type='text', 
    label, 
    error,
    touched,
    initialValue,
    initialTouched,
    initialError,
    noMargin,
    size='normal',
    ...rest
  } = props

  const styles = {
    wrapper: {
      default: [
        'w-full',
        label && 'flex flex-col',
        noMargin ? 'mb-0': 'mb-4',
      ]
    },
    label: {
      default: [
        'text-gray-600',
        'mb-1',
        size ? sizes[size].label : sizes['normal'].label,
      ]
    },
    input: {
      default: [
        'border-2',
        'border-gray-300',
        'rounded',
        'placeholder-gray-500',
        'text-gray-600',
        'w-full',
        size ? sizes[size].input : sizes['normal'].input,
        touched && error ? 'border-red-300': 'border-gray-300'
      ],
      focus: [
        'border-blue-300',
      ]
    },
    errorMessage: {
      default: [
        'block',
        'mt-1',
        'text-sm',
        'text-red-500',
      ]
    }
  }

  return (<div className={cn(styles.wrapper)}>
    {label && <label className={cn(styles.label)}>{label}</label>}
    <input ref={ref} className={cn(styles.input)} type={type} {...rest}/>
    {touched && error && <span className={cn(styles.errorMessage)}>{error}</span>}
  </div>)
})

const FormikTextField = ({label, type='text', ...rest}) => {
  const [field, meta] = useField(rest)

  return (<TextField label={label} type={type} {...field} {...meta} {...rest}/>)
}

export { TextField, FormikTextField }