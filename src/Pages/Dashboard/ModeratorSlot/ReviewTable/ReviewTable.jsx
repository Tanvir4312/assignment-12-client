import React from 'react'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ReviewTable = ({ product, idx, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { name, _id } = product || {}

    //    Make Featured
    const handleMakeFeatured = async id => {
        try {
            await axiosSecure.patch(`/product/reviewQueue-update/${id}`,)
            toast.success('Product Featured')
            refetch()
        } catch (err) {
            console.log(err)
        }
    }
    //    Make Featured
    const handleAccept = async id => {

        Swal.fire({
            title: "Are you sure you accepted this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axiosSecure.patch(`/product/reviewQueue-update/${id}`, { status: 'Accepted' })
                    toast.success('Tanks for accepted')
                    refetch()
                } catch (err) {
                    console.log(err)
                }



                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });




    }
    // //    Make Featured
    const handleRejected = async id => {

        Swal.fire({
            title: "Are you sure you rejected this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/product/reviewQueue-update/${id}`, { status: 'Rejected' })
                    toast.success('Reject This Product')
                    refetch()
                } catch (err) {
                    console.log(err)
                }

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });

    }
    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td><Link to={`/product-details/${_id}`}><span className='cursor-pointer'><img className='w-8' src="https://img.icons8.com/?size=128&id=44764&format=png" alt="" /></span></Link></td>

            <td><button onClick={() => handleMakeFeatured(_id)} className={`btn ${product.isFeatured === false ? '' : 'bg-green-400 text-white'}`}>{product.isFeatured === false ? 'Make Featured' : 'Featured'}</button></td>

            <td title={product.status === 'Rejected' ? 'You Reject this product' : ''}><button disabled={product.status === 'Accepted' || product.status === 'Rejected'} onClick={() => handleAccept(_id)} className={`${product.status === 'Accepted' || product.status === 'Rejected' ? 'cursor-not-allowed' : 'cursor-pointer '} ${product.status === 'Accepted' && 'bg-blue-400 text-white px-4 rounded py-2'}`}>{product.status === 'Accepted' ? 'Accepted' : <img className='w-8' src="https://img.icons8.com/?size=160&id=pYdTNwa8UL93&format=png" alt="" />}</button></td>

            <td title={product.status === 'Accepted' ? 'You Accept this product' : ''}><button disabled={product.status === 'Accepted' || product.status === 'Rejected'} onClick={() => handleRejected(_id)} className={`${product.status === 'Accepted' || product.status === 'Rejected' ? 'cursor-not-allowed' : 'cursor-pointer '} ${product.status === 'Rejected' && 'bg-red-400 text-white px-4 rounded py-2 cursor-not-allowed'}`}>{product.status === 'Rejected' ? 'Rejected' : <img className='w-8' src="https://img.icons8.com/?size=80&id=21066&format=png" alt="" />}</button></td>
        </tr>
    )
}



export default ReviewTable
