import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { toast } from 'react-toastify'

const ReportedTable = ({ reportedProduct, idx, refetch }) => {
    const {name, _id} = reportedProduct || {}
    const axiosSecure = useAxiosSecure()

    // Delete
     const handleDelete = id => {
    
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axiosSecure.delete(`/product-data-delete/${id}`)
                        toast.success('Reported Data Deleted')
                        refetch()
                    } catch (err) {
                        console.log(err)
                    }
    
                }
            });
    
            console.log(id)
        }
    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td><Link to={`/product-details/${_id}`}><button className='btn'>Details</button></Link></td>
            <td><button onClick={() => handleDelete(_id)} className='cursor-pointer'><img className='w-10' src="https://img.icons8.com/?size=128&id=Pvblw74eluzR&format=png" alt="" /></button></td>
        </tr>
    )
}

export default ReportedTable
