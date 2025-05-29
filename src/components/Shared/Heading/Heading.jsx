import React from 'react'

const Heading = ({text}) => {
  return (
    <div className='text-center my-7'>
      <h1 className='text-3xl font-bold uppercase'>{text}</h1>
     <div className='my-3 lg:w-[350px] lg:mx-auto md:mx-5 mx-1'>
       <hr />
     </div>
    </div>
  )
}

export default Heading
