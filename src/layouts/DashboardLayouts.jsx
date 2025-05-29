import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Pages/Dashboard/Sidebar/Sidebar'

const DashboardLayouts = () => {
    return (
        <div className='md:flex gap-5'>
            <div className='md:bg-amber-500 md:min-h-screen md:w-1/4'>
                {/* Lest Side */}
                <Sidebar></Sidebar>
            </div>
            <div className='md:w-3/4'>
                {/* Right side */}
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardLayouts
