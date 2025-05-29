import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";

import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";




// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogout = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const user = {
          email: currentUser?.email,
          name: currentUser?.displayName,
          role: 'user',
          isSubscribed: false,
          subscriptionAmount: 10,
          createdAt: new Date(),
          subscriptionDate: null,
          paymentVerified: false,
          status: 'pending'
        }
        try {
          const { data } = await axiosPublic.post(`/user/${currentUser?.email}`, user)
          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }

    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  console.log(user);

  const autInfo = {
    user,
    loading,
    createUser,
    userLogin,
    loginWithGoogle,
    profileUpdate,
    userLogout
  };
  return (
    <AuthContext.Provider value={autInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
