import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import PaymentModal from './PaymentModal/PaymentModal'
import useCoupon from '../../../hooks/useCoupon'
import { toast } from 'react-toastify'


const MyProfile = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const [coupons] = useCoupon()
  const [couponValue, setCouponValue] = useState('')
  const [subscriptionAmount, setSubscriptionAmount] = useState(99)
  const [inputValueDisabled, setInputValueDisabled] = useState(false)

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`)
      return data
    }
  })
  const { isSubscribed, status } = userInfo

  const handleCouponUse = (e) => {
    e.preventDefault()
    const form = e.target

    const couponCode = coupons.find(coupon => coupon?.coupon_code === couponValue)

    if (couponCode) {
      const discountSubscriptionAmount = subscriptionAmount - couponCode?.discount
      setSubscriptionAmount(discountSubscriptionAmount)
      toast.success(`Congratulations, You Got $${couponCode?.discount} discount`)
      setInputValueDisabled(true)
      form.reset()
    }
    else {

      toast.error('Please input valid coupon code')
      form.reset()
    }
  }

  return (
    <div className='my-7 flex md:items-center'>
      <div className='bg-blue-100 w-3/4 mx-auto text-center lg:pt-28 md:pt-7 rounded py-6 px-3'>
        <h2 className='text-3xl font-bold'>{user?.displayName}</h2>
        <div className='py-5'>
          <img className='mx-auto rounded-full w-20 h-20' src={user?.photoURL} alt="" />
        </div>
        <p>{user?.email}</p>
        <div className='my-5'>
          <button onClick={() => setIsOpen(true)} disabled={isSubscribed} className='btn btn-primary'>Subscribe - ${subscriptionAmount}/month</button>
        </div>
        {/* Coupon Use */}
        <div className='flex flex-col items-center'>
          <p className='text-xl '>Use <span className='font-medium text-orange-500'>Coupon Code</span></p>
          <form onSubmit={handleCouponUse}>
            <fieldset className="fieldset">
              <input disabled={inputValueDisabled} name='couponValue' onChange={(e) => setCouponValue(e.target.value)} type="text" className="input my-3" placeholder="Coupon Code" />
            </fieldset>
            <button disabled={inputValueDisabled} className='btn btn-primary mb-2'>Use Code</button>
          </form>
        </div>

        <div className='flex items-center justify-center gap-4 mb-5 font-medium'>

          {
            status === 'verified' ? <p className='flex items-center gap-2'>Status: <img className='w-5' src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="" />  <span className='text-green-500'>Verified</span></p>
              :
              <p>Status: <span className='text-red-500'>{status}</span> </p>
          }
        </div>
      </div>
      <div>
        {
          <PaymentModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            subscriptionAmount={subscriptionAmount}
            userInfo={userInfo}
            refetch={refetch}
          ></PaymentModal>
        }
      </div>

    </div>
  )
}

export default MyProfile
