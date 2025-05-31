import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from './useAxiosSecure';

const useCoupon = () => {
    const axiosSecure = useAxiosSecure()
    // get review data
    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['all-coupon'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-coupon');
            return data
        }
    })
    return [coupons, refetch]
}

export default useCoupon
