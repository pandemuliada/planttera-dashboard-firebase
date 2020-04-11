import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonLoader = ({ count=1, height=10 }) => {
  return(<div>
    <SkeletonTheme color='#f7fafc' highlightColor='#edf2f7'>
      <Skeleton height={height} count={count}/>
    </SkeletonTheme>
  </div>)
}

export default SkeletonLoader