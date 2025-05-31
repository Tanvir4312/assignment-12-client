

import Heading from '../../../../components/Shared/Heading/Heading'
import useUsers from '../../../../hooks/useUsers'
import ManageUsersTable from '../ManageUsersTable/ManageUsersTable'


const ManageUsers = () => {
  const [users, refetch] = useUsers()



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
