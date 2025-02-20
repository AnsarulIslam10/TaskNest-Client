import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { toast } from 'react-toastify';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

   
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    
    const updateUserProfile =(updateData) => {
        updateProfile(auth.currentUser, updateData)
        setUser({...auth.currentUser, ...updateData})
    }

    const signOutUser = () =>{
        setLoading(true)
        toast.success("Log-Out successful")
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        signInWithGoogle,
        signOutUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;