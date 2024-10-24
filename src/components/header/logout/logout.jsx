'use client'
import { UserContext } from '@/Context/Usercontext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function LogoutApp({children}) {
  const router = useRouter()
    const { Userdata, setUserdata, setAuthorization } = useContext(UserContext);
    const handleLogout = () => {
        Cookies.remove('Authorization')
        Cookies.remove('Userdata')
        setUserdata(null);
        setAuthorization(null);
        router.push("/auth/login");
    };
  return (
    <div onClick={handleLogout}>
        {children}
    </div>
  )
}
