import React from 'react'
import Heading from '../../../../components/Shared/Heading/Heading'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from "@tanstack/react-query";
import ReviewTable from '../ReviewTable/ReviewTable';

const ReviewQueue = () => {
    const axiosSecure = useAxiosSecure()

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/product-review')
            return data
        }
    })

    // Priority Map
    const statusPriority = {
        'pending': 1,
        'accepted': 2,
        'rejected': 3
    }

    // Sort Data
    const sortedProducts = [...products].sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
  
    return (
        <div>
            <div>
                <Heading text={'product review queue'}></Heading>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Make Featured</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedProducts.map((product, idx) => <ReviewTable
                                key={product._id}
                                product={product}
                                idx={idx}
                            ></ReviewTable>)
                        }
                        

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReviewQueue
