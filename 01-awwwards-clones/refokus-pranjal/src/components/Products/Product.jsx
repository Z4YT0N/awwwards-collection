import React from "react"
import Button from "../Button"

const Product = ({ val, count, mover }) => {
  return (
    <div className='w-full h-[20rem] py-20 '>
      <div
        onMouseEnter={() => mover(count)}
        className='max-w-screen-xl mx-auto flex items-center justify-between'
      >
        <h1 className='text-6xl capitalize font-medium'>{val.title}</h1>
        <div className='dets w-1/3'>
          <p className='mb-10'>{val.description}</p>
          <div className='flex items-center gap-5'>
            {val.live && <Button />}
            {val.case && <Button title='Case Study' />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
