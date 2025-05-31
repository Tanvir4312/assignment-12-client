import React from 'react'
import { useState } from 'react';
import Marquee from "react-fast-marquee";

const CouponCard = ({ coupon }) => {
    const [copied, setCopied] = useState(false);
    const { coupon_code, discount, expiry_date, description } = coupon || {}

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(coupon_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div>
         
            <div className="shadow-md rounded-lg p-4 border relative flex flex-col justify-between w-60 h-64">
                <div>
                    <h3 onClick={handleCopy}
                        title="Click to copy" className="text-lg font-bold mb-2">🧾 Coupon Code: {coupon_code}</h3>

                    {copied && (
                        <span className="absolute top-2 right-2 text-sm bg-green-100 text-green-700 px-2 rounded">
                            Copied Code!
                        </span>
                    )}
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
