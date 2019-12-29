import React from 'react'
import { useField } from 'formik'
import { cn } from '../../utils/format'

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
    ...rest
  } = props

  const styles = {
    wrapper: {
      default: [
        'flex',
        'flex flex-col',
        'w-full',
        noMargin ? 'mb-0': 'mb-4',
      ]
    },
    label: {
      default: [
        'text-gray-600',
        'mb-1',
      ]
    },
    input: {
      default: [
        'border-2',
        'border-gray-300',
        'px-3 py-2',
        'rounded',
        'placeholder-gray-500',
        'text-gray-700',
        touched && error ? 'border-red-300': 'border-gray-300'
      ],
      focus: [
        'border-blue-300',
        // 'outline-none',
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
    {label && <span className={cn(styles.label)}>{label}</span>}
    <input ref={ref} className={cn(styles.input)} type={type} {...rest}/>
    {touched && error && <span className={cn(styles.errorMessage)}>{error}</span>}
  </div>)
})

const FormikTextField = ({label, type='text', ...rest}) => {
  const [field, meta] = useField(rest)

  return (<TextField label={label} type={type} {...field} {...meta} {...rest}/>)
}

export { TextField, FormikTextField }