import React from 'react'
import Marquee from "react-fast-marquee";

const CouponCard = ({coupon}) => {
   
     const { coupon_code, discount, expiry_date, description } = coupon || {}

  return (
 <div>
            
                <div className="bg-white shadow-md rounded-lg p-4 border relative flex flex-col justify-between w-60 h-64">
                <div>
                    <h3 className="text-lg font-bold mb-2">🧾 Coupon Code: {coupon_code}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                        🗓️ Expiry Date: <span className="font-medium">{expiry_date}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                        📝 Description: {description}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                        💸 Discount: <span className="font-bold text-green-600">$ {discount}</span>
                    </p>

                </div>
                
            </div>
           

           
        </div>
  )
}

export default CouponCard
