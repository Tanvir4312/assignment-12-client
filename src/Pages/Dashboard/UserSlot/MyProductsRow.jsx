import React from 'react'
import { Link } from 'react-router-dom';

const MyProductsRow = ({product, idx}) => {

    const {name,votes,status, _id} = product || {}
    return (
        <tr className="bg-base-200">
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td>{votes}</td>
            <td>{status}</td>
            <td><Link to={`/my-product-update/${_id}`}><button className='btn btn-outline border-0'><img className='w-7' src="https://img.icons8.com/?size=96&id=81427&format=png" alt="" /></button></Link></td>
            <td><button className='btn btn-outline border-0'><img className='w-7' src="https://img.icons8.com/?size=160&id=102350&format=png" alt="" /></button></td>
        </tr>
    )
}

export default MyProductsRow
