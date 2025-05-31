import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const useAxiosSecure = () => {
  const { userLogout } = useAuth()
  const navigate = useNavigate()
  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`

    return config
  }, error => {
    return Promise.reject(error)
  })

  // Intercepts 401 and 403
  useEffect(() => {
    axiosSecure.interceptors.response.use(response => {
      return response
    }, async error => {

      const status = error.response.status;
      if (status === 401 || status === 403) {
        await userLogout()
        navigate('/login')
      }

      return Promise.reject(error)
    })
  }, [navigate, userLogout])
  return axiosSecure;
};

export default useAxiosSecure;
