import React from 'react'
import Heading from '../../../../components/Shared/Heading/Heading'
import AddCoupon from './AddCoupon/AddCoupon'

const ManageCoupons = () => {
  return (
    <div>
      <div>
        <Heading text={"add coupon"}></Heading>
      </div>

      <div>
        <AddCoupon></AddCoupon>
      </div>
    </div>
  )
}

export default ManageCoupons
