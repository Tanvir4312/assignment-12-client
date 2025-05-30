import React from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import ModeratorSidebar from '../ModeratorSidebar/ModeratorSidebar'
import AdminSidebar from '../AdminSidebar/AdminSidebar'


const Sidebar = ({ user }) => {
 
  return (
    <div>
      {/* User */}
      {
        user?.role === 'user' && <UserSidebar></UserSidebar>
      }
      {/* Moderator */}
      {
        user?.role === 'moderator' && <ModeratorSidebar></ModeratorSidebar>
      }
      {/* Admin */}
      {
        user?.role === 'admin' && <AdminSidebar></AdminSidebar>
      }
    </div>
  )
}

export default Sidebar