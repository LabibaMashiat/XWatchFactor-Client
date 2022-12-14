import React, { createContext, useEffect, useState } from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,updateProfile, signInWithPopup} from 'firebase/auth';
import app from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
export const AuthContext=createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    
    const[addAdvertisedItems,setAddAdvertisedItems]=useState([]);
    const[buttonDisable,setButtonDisable]=useState(false);
    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    };
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    };
    const providerLogin=(provider)=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    };
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    };
    const updateUser=(userInfo)=>{
        return updateProfile(auth.currentUser,userInfo);
    };
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=> unSubscribe();
    },[]);
    const authInfo={createUser,signIn,logOut,updateUser,user,loading,providerLogin,addAdvertisedItems,setAddAdvertisedItems,setButtonDisable,buttonDisable};
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;