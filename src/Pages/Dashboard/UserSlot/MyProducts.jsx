import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Heading from '../../../components/Shared/Heading/Heading'
import MyProductsRow from './MyProductsRow'

const MyProducts = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/specific-product/${user?.email}`)
      return data
    }
  })

  return (
    <div>
      <div>
        <Heading text={'my-products'}></Heading>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>PRODUCT NAME</th>
              <th>VOTES</th>
              <th>STATUS</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>

            {
              products.map((product, idx) => <MyProductsRow
                key={product._id}
                product={product}
                idx={idx}
                refetch={refetch}
              ></MyProductsRow>)
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyProducts

