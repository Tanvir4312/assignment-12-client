import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import PaymentModal from './PaymentModal/PaymentModal'


const MyProfile = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`)
      return data
    }
  })
  const { isSubscribed, status, subscriptionAmount } = userInfo

  return (
    <div className='h-[100vh] flex md:items-center'>
      <div className='bg-blue-100 w-3/4 mx-auto text-center lg:pt-28 md:pt-7 rounded'>
        <h2 className='text-3xl font-bold'>{user?.displayName}</h2>
        <div className='py-5'>
          <img className='mx-auto rounded-full w-20 h-20' src={user?.photoURL} alt="" />
        </div>
        <p>{user?.email}</p>
        <div className='my-5'>
          <button onClick={() => setIsOpen(true)} disabled={isSubscribed} className='btn btn-primary'>Subscribe - ${subscriptionAmount}/month</button>
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
