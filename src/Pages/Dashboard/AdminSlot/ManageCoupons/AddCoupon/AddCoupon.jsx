import React from 'react'

import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import ShowCoupon from '../ShowCoupon/ShowCoupon';


const AddCoupon = () => {
    const axiosSecure = useAxiosSecure()

    const handleCoupon = async (e) => {
        e.preventDefault();

        const form = e.target;
        const coupon = form.coupon.value;
        const date = form.date.value;
        const description = form.description.value;
        const amount = form.amount.value;

        const couponObj = {
            coupon_code: coupon,
            expiry_date:date,
            description,
            discount:Number(amount)

        };

        // Save Coupon
        try {
            await axiosSecure.post("/coupons", couponObj);
            toast.success("Coupon Add");
            form.reset()
        } catch (err) {
            console.log(err);
        }

        refetch()
    };

    // get review data
    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['all-coupon'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-coupon');
            return data
        }
    })
    

    return (
        <div>
            <div className="bg-slate-300 p-5 rounded md:m-0 mx-3">
                <form className="mt-0" onSubmit={handleCoupon}>
                    {/* Coupon Code */}
                    <legend className="fieldset-legend">Coupon Code</legend>
                    <label className="input validator w-full">

                        <input
                            className="w-full"
                            name="coupon"
                            type="text"
                            required
                            placeholder="Coupon Code"
                            title="Only letters, numbers or dash"
                        />
                    </label>
                    {/* Expiry Date */}

                    <legend className="fieldset-legend">Expiry Date</legend>
                    <label className="input validator w-full">

                        <input
                            className="w-full"
                            name="date"
                            type="date"
                            required
                            placeholder="Expiry Date"
                            title="Only letters, numbers or dash"
                        />
                    </label>




                    {/* Coupon code description */}
                    <legend className="fieldset-legend">Coupon code description</legend>
                    <fieldset className="fieldset pb-5">
                        <textarea
                            className="textarea h-24 w-full"
                            name="description"
                            placeholder="Description"
                            required
                        ></textarea>
                    </fieldset>



                    {/* Discount Amount */}
                    <legend className="fieldset-legend">Discount Amount</legend>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Discount Amount"
                        className="input w-full mb-5"
                    />

                    <div className="text-center">
                        <button className="btn btn-outline md:w-[15rem] border-white text-white hover:text-black">
                            Add Coupon
                        </button>
                    </div>
                </form>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-7 lg:p-0 p-5'>
                {
                    coupons.map(coupon => <ShowCoupon
                        key={coupon._id}
                        coupon={coupon}
                        refetch={refetch}
                    ></ShowCoupon>)
                }
            </div>
        </div>
    )
}

export default AddCoupon
