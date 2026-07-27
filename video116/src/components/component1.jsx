import React from 'react'
import { useContext } from 'react'
import { counterContext } from '../with context API/context'

const component1 = () => {
  const value = useContext(counterContext)
  return (
    <div>
      {value.count}
    </div>
  )
}

export default component1
