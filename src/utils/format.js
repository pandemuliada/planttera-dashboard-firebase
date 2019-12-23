function cn(css) {
  let styles = ''

  Object.keys(css).map((key) => {
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

export { cn }
