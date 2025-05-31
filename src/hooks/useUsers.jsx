import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['all-user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-user/${user?.email}`);
            return data
        }
    })
    return [users, refetch]
}

export default useUsers
