import React from 'react'
import Heading from '../../../components/Shared/Heading/Heading';
import ProductsCard from '../../../components/Shared/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import CouponCard from './CouponCard/CouponCard';

import Marquee from 'react-fast-marquee';


const TrendingProduct = () => {
  const [products, refetch] = useProducts();
  const axiosSecure = useAxiosSecure()
  const sortedData = products.sort((a, b) => b.votes - a.votes);


  // Coupon
  // get coupon data
  const { data: coupons = [] } = useQuery({
    queryKey: ['all-coupon'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/all-coupon');
      return data
    }
  })

  return (
    <div>
      <div>
        <Heading text={"trending products"}></Heading>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {sortedData.map((product) => (
          <ProductsCard
            key={product._id}
            product={product}
            refetch={refetch}
          ></ProductsCard>
        ))}
      </div>
      <div className="text-center">
        <Link to={"/products"}>
          {" "}
          <button className="btn bg-blue-400 md:w-[15rem] border-white text-white hover:text-black hover:bg-white">
            Show All Products
          </button>
        </Link>
      </div>

      <div className='my-5'>
        <h5 className='text-xl text-center font-medium'>Choose Your <span className='text-rose-500'>best Deal</span></h5>
      </div>

      
      
        <Marquee pauseOnHover={true} gradient={false} speed={100}>
        <div className="flex gap-4 px-2">
          {coupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
      </Marquee>
      

    </div>
  )
}

export default TrendingProduct
