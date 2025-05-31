import React from 'react'
import useAuth from '../../../hooks/useAuth';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ProductDetailsCard = ({ product, refetch }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [inputValue, setInputValue] = useState(null)
    const { description, name, photo, links, tags, votes, ownerEmail, _id, report, status } = product || {}


    const tagArray = typeof tags === 'string' ? tags.split(', ') : tags;


    //    Up vote button
    const handleVotes = async (id) => {

        try {
            await axiosSecure.patch(`/products/vote/${id}`, {
                userEmail: user?.email,
            });
            toast.success("Thank you for your vote❤️");
            refetch();
        } catch (err) {
            if (err.response.data.message) {
                return toast.error(err.response.data.message);
            }
        }
    };

    //   Report button

    const handleReport = async (id) => {

        try {
            await axiosSecure.patch(`/products/report/${id}`, {
                userEmail: user?.email,

            });
            toast.success("Report Done");
            refetch();
        } catch (err) {
            if (err) {
                return toast.error(err.response.data.message);
            }
        }
    };

    //   Review Submit
    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value
        const photo = form.photo.value
        const review = form.review.value
        const rating = Number(form.rating.value)


        const reviewData = {
            name, photo, review, rating, productId: _id
        }



        try {
            await axiosSecure.post('/review-data', reviewData)
            toast.success('Tanks for your reviews')
            form.reset()
        } catch (err) {
            console.log(err)
        }
        refetchReviews()
    }

    // get review data
    const { data: reviews = [], refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', _id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${_id}`);
            return data
        }
    })




    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Product Details */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <img src={photo} alt={product.name} className="w-80 mx-auto h-64 mb-4 rounded" />
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-gray-600 my-2">{description}</p>
                {tagArray?.map((tag, idx) => <p key={idx} className="text-sm text-blue-500 mb-2">Tags: {tag}</p>)}
                <a href={links} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Visit External Link
                </a>
                <p className='text-xl mt-2'>Total Votes: <span className='text-blue-500 font-medium'>{votes}</span></p>
                <p className='text-xl my-2'>Total Report: <span className='text-red-500 font-medium'>{report}</span></p>
                <p className='text-xl'>Status: <span className={`${status === 'reported' && 'text-red-500'} ${status === 'pending' && 'text-yellow-500'}  font-medium`}>{status}</span></p>
                <div title={user?.email === ownerEmail ? 'You owner this product' : ''} className="flex items-center gap-4 mt-4">
                    <button disabled={user?.email === ownerEmail}
                        onClick={() => handleVotes(_id)}
                        className='btn btn-primary'>👍 Upvote </button>
                    <button disabled={user?.email === ownerEmail} onClick={() => handleReport(_id)} className="btn btn-error">🚩 Report</button>
                </div>
            </div>

            {/* Reviews Section */}

            <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                {reviews?.length === 0 && <p>No reviews yet.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-3 rounded shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <img src={review.photo} className="w-8 h-8 rounded-full" alt="" />
                                <span className="font-medium">{review.name}</span>
                            </div>
                            <p>{review.review}</p>
                            <p className="text-yellow-500 mt-2">Rating: {review.rating}⭐</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Post Review Section */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Post a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <input type="text" name='name' value={user?.displayName || ''} readOnly className="input input-bordered w-full" />
                    <input type="text" name='photo' value={user?.photoURL || ''} readOnly className="input input-bordered w-full" />
                    <textarea
                        onChange={(e) => setInputValue(e.target.value)}
                        name='review'
                        placeholder="Write your review..."
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    <input
                        type="number"
                        name='rating'
                        min="1"
                        max="5"
                        placeholder="Rating (1 to 5)"
                        className="input input-bordered w-full"
                    />
                    <div title={user?.email === ownerEmail ? 'You owner this product' : ''}>
                        <button disabled={user?.email === ownerEmail || !inputValue} type="submit" className="btn btn-success">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductDetailsCard
