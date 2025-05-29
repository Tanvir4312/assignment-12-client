import React from 'react'
import { Link } from 'react-router-dom'

const ReviewTable = ({ product, idx }) => {
   
    const {name, _id} = product || {}
    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td><Link to={`/product-details/${_id}`}><span className='cursor-pointer'><img className='w-8' src="https://img.icons8.com/?size=128&id=44764&format=png" alt="" /></span></Link></td>
            <td><button className='btn'>Make Featured</button></td>
            <td><span className='cursor-pointer'><img className='w-8' src="https://img.icons8.com/?size=160&id=pYdTNwa8UL93&format=png" alt="" /></span></td>
            <td><span className='cursor-pointer'><img className='w-8' src="https://img.icons8.com/?size=80&id=21066&format=png" alt="" /></span></td>
        </tr>
    )
}

export default ReviewTable
