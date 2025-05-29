import React from 'react'

import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure'

import Heading from '../../components/Shared/Heading/Heading'
import ProductDetailsCard from './ProductDetailsCard/ProductDetailsCard'
import { useQuery } from '@tanstack/react-query'


const ProductDetail = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()



    const { data: product = {}, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product-details/${id}`)
            return data
        }
    })



    return (
        <div>
            <div>
                <Heading text={'product details'}></Heading>
            </div>

            <div>
                {
                    <ProductDetailsCard
                        product={product}
                        refetch={refetch}
                    ></ProductDetailsCard>
                }
            </div>
        </div>
    )
}

export default ProductDetail
