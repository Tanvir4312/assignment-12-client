import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'


const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: role, isLoading} = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/role/${user?.email}`)
            return data.role
        }
    })
    return [role, isLoading]
}

export default useRole
