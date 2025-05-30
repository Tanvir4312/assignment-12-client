import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Heading from '../../../../components/Shared/Heading/Heading'
import ManageUsersTable from '../ManageUsersTable/ManageUsersTable'
import useAuth from '../../../../hooks/useAuth'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()

  const { data: users = [], refetch } = useQuery({
    queryKey: ['all-user', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-user/${user?.email}`);
      return data
    }
  })
 
  return (
    <div>
      <div>
        <Heading text={'manage-users'}></Heading>
      </div>


      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>USER NAME</th>
                <th>USER EMAIL</th>
                <th>MAKE MODERATOR</th>
                <th>MAKE ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, idx) => <ManageUsersTable
                  key={user._id}
                  user={user}
                  refetch={refetch}
                  idx={idx}
                ></ManageUsersTable>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
