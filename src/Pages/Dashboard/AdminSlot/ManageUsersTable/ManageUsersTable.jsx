
import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { toast } from 'react-toastify';

const ManageUsersTable = ({ user, idx, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { name, email } = user || {}

    // Make moderator
    const handleMakeModerato = async id => {
        try {
            await axiosSecure.patch(`/user-update/${id}`,{ role: 'moderator' })
            toast.success(`${name} have Moderator successfully`)
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    // Make Admin
    const handleMakeAdmin = async id => {
        try {
            await axiosSecure.patch(`/user-update/${id}`, { role: 'admin' })
            toast.success(`${name} have Admin successfully`)
            refetch()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td><button onClick={() => handleMakeModerato(user?._id)} className={`btn ${user.role === 'moderator' ? 'text-white bg-green-500' : ''}`}>{user.role === 'moderator' ? 'Moderator' : 'Make Moderator'}</button></td>
            <td><button onClick={() => handleMakeAdmin(user?._id)} className={`btn ${user.role === 'admin' ? 'text-white bg-blue-500' : ''}`}>{user.role === 'admin' ? 'Admin' : 'Make Admin'}</button></td>

        </tr>
    )
}

export default ManageUsersTable
