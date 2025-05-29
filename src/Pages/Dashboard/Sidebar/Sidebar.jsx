import React from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import ModeratorSidebar from '../ModeratorSidebar/ModeratorSidebar'


const Sidebar = ({ user }) => {
 
  return (
    <div>
      {/* User */}
      {
        user.role === 'user' && <UserSidebar></UserSidebar>
      }
      {/* Moderator */}
      {
        user.role === 'moderator' && <ModeratorSidebar></ModeratorSidebar>
      }
    </div>
  )
}

export default Sidebar