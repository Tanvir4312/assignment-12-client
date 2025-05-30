import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const MyProductsRow = ({ product, idx, refetch }) => {
    const axiosSecure = useAxiosSecure()

    const { name, votes, status, _id } = product || {}

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
                    toast.success('Your Data Deleted')
                    refetch()
                } catch (err) {
                    console.log(err)
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

  
    }
    return (
        <tr className="bg-base-200">
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td>{votes}</td>
            <td>{status}</td>
            <td><Link to={`/my-product-update/${_id}`}><button className='btn btn-outline border-0'><img className='w-7' src="https://img.icons8.com/?size=96&id=81427&format=png" alt="" /></button></Link></td>
            <td><button onClick={() => handleDelete(_id)} className='btn btn-outline border-0'><img className='w-7' src="https://img.icons8.com/?size=160&id=102350&format=png" alt="" /></button></td>
        </tr>
    )
}

export default MyProductsRow
