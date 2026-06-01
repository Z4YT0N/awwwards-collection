import React from 'react'
import Card from './Card'

function Cards() {
  return (
    <div className='w-full'>
        <div className="max-w-screen-xl mx-auto py-20 flex gap-1">
            <Card width ={"basis-1/3"} start={false} para={true}/>
            <Card width ={"basis-2/3"} start={true} para={false} hover="true"/>
        </div>

    </div>
  )
}

export default Cards