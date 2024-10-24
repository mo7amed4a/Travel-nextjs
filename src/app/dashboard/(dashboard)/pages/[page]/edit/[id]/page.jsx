import React from 'react'

export default function page({params}) {
    
  return (
    <div>page - {params.page} - {params.id}</div>
  )
}
