import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Pages/Dashboard/Sidebar/Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

const DashboardLayouts = () => {
    const [userInfo, setUserInfo] = useState([])
    const {user} = useAuth()


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [user?.email])


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
