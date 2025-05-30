import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UpdateCouponModal from '../UpdateCouponModal/UpdateCouponModal';

const ShowCoupon = ({ coupon, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const { coupon_code, discount, expiry_date, description, _id } = coupon || {}

    // Edit
    const handleEdit = () => {
        
        setIsOpen(true)
    }
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
                    await axiosSecure.delete(`/coupon-data-delete/${id}`)
                   
                    refetch()
                } catch (err) {
                    console.log(err)
                }

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Coupon Delete Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });


    }



    return (
        <div>
            <div className="bg-white shadow-md rounded-lg p-4 border relative flex flex-col justify-between h-[250px]">
                <div>
                    <h3 className="text-lg font-bold mb-2">🧾 Coupon Code: {coupon_code}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                        🗓️ Expiry Date: <span className="font-medium">{expiry_date}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                        📝 Description: {description}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                        💸 Discount: <span className="font-bold text-green-600">$ {discount}</span>
                    </p>

                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleEdit}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={ () => handleDelete(_id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div>
                <UpdateCouponModal 
                setIsOpen={setIsOpen} 
                isOpen={isOpen}
                coupon={coupon}
                refetch={refetch}
                ></UpdateCouponModal>
            </div>
        </div>
    );
};

export default ShowCoupon;
