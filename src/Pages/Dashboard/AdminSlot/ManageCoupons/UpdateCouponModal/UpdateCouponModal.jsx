import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAxiosSecure from '../../../../../hooks/useAxiosSecure'
import { toast } from 'react-toastify'

const UpdateCouponModal = ({ setIsOpen, isOpen, coupon, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const handleUpdateCoupon = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCoupon = {
            coupon_code: form.coupon.value,
            expiry_date: form.date.value,
            description: form.description.value,
            discount: Number(form.amount.value),
        };
        try {
            await axiosSecure.put(`/coupon-update/${coupon?._id}`, updatedCoupon);
            toast.success("Coupon Successfully Update");
            refetch()

        } catch (err) {
            console.log(err);
        }
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 md:p-4"
        >
            <DialogPanel className="w-full max-w-md rounded-lg bg-white p-4 md:p-6 shadow-lg">
                <DialogTitle className="text-center text-xl md:text-2xl font-semibold mb-4 md:mb-6">Edit Coupon</DialogTitle>

                <form onSubmit={handleUpdateCoupon} className="space-y-3 md:space-y-5">
                    {/* Coupon Code */}
                    <div>
                        <label htmlFor="coupon" className="block mb-1 font-medium text-gray-700 text-sm md:text-base">
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            name="coupon"
                            defaultValue={coupon?.coupon_code}
                            placeholder="Enter coupon code"

                            title="Only letters, numbers, or dash allowed"
                            className="w-full rounded border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="date" className="block mb-1 font-medium text-gray-700 text-sm md:text-base">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={coupon?.expiry_date}
                            className="w-full rounded border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Coupon Description */}
                    <div>
                        <label htmlFor="description" className="block mb-1 font-medium text-gray-700 text-sm md:text-base">
                            Coupon Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={coupon?.description}
                            rows="3"

                            placeholder="Write a brief description"
                            className="w-full resize-none rounded border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Discount Amount */}
                    <div>
                        <label htmlFor="amount" className="block mb-1 font-medium text-gray-700 text-sm md:text-base">
                            Discount Amount (%)
                        </label>
                        <input
                            type="number"
                            name="amount"
                            defaultValue={coupon?.discount}
                            min="1"
                            max="100"

                            placeholder="Enter discount percentage"
                            className="w-full rounded border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-700 transition text-sm md:text-base"
                    >
                        Update Coupon
                    </button>
                </form>

                {/* Cancel Button */}
                <div className="mt-3 text-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn hover:bg-red-400 text-sm md:text-base"
                    >
                        Cancel
                    </button>
                </div>
            </DialogPanel>
        </Dialog>
    )
}

export default UpdateCouponModal;
