import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Pages/Dashboard/Sidebar/Sidebar'
import { useState } from 'react'

import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'

const DashboardLayouts = () => {
    const [userInfo, setUserInfo] = useState([])
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    if (loading) {
        return <div>Loading</div>
    }
    try {
        axiosSecure.get(`/user/${user?.email}`)
            .then(res => {
                setUserInfo(res.data)
            })
    } catch (err) {
        console.log(err)
    }


    return (
        <div className='md:flex gap-5'>
            <div className='md:bg-amber-500 md:min-h-screen md:w-1/4'>
                {/* Lest Side */}
                <Sidebar user={userInfo}></Sidebar>

            </div>
            <div className='md:w-3/4'>
                {/* Right side */}
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardLayouts
