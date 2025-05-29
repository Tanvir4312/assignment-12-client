import React from 'react'

const Slide = ({slideImage, heading, text}) => {
  return (
    <div className='h-full bg-cover bg-blend-overlay bg-black/40' style={{backgroundImage: `url(${slideImage})`}}>
      <div className='text-center relative top-36 px-2'>
        <h2 className='text-3xl text-blue-500 font-bold'>{heading}</h2>
      <p className='text-white'>{text}</p>
      </div>
    </div>
  )
}

export default Slide
