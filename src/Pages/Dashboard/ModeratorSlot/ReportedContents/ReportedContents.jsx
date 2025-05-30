import React from 'react'
import Heading from '../../../../components/Shared/Heading/Heading'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import ReportedTable from '../ReportedTable/ReportedTable'

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure()

  const { data: reportedProducts = [], refetch } = useQuery({
    queryKey: ['product-reported'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/product-reported')
      return data
    }
  })

  return (
    <div>
      <div>
        <Heading text={'reported contents'}></Heading>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>PRODUCT NAME</th>
              <th>VIEW DETAILS</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>

            {
              reportedProducts.map((reportedProduct, idx) => <ReportedTable
                key={reportedProduct._id}
                idx={idx}
                reportedProduct={reportedProduct}
                refetch={refetch}
              ></ReportedTable>)
            }

          </tbody>
        </table>
      </div>


    </div>
  )
}

export default ReportedContents
