function cn(css) {
  let styles = ''

  Object.keys(css).map(key => {
    return (styles += css[key].reduce((temp, currentStyle) => {
      if (key === 'default') {
        return `${temp} ${currentStyle}`
      } else {
        return `${temp} ${key}:${currentStyle}`
      }
    }, ''))
  })

  return styles
}

function formatError(errors) {
  const formatedError = {}
  errors.map(error => {
    formatedError[error.field] = error.message
  })

  return formatedError
}

export { cn, formatError }
