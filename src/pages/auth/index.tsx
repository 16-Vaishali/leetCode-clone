import { authModalState } from '@/atoms/authModalAtom'
import AuthModal from '@/components/Modals/AuthModal'
import Navbar from '@/components/Navbar/Navbar'
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'



function Auth() {
  const authModal = useRecoilValue(authModalState)
  const router = useRouter()
  const [user,loading,error] = useAuthState(auth)
  const [pageLoading,setPageLoading] = useState(true)
useEffect(()=>{
  if(user) router.push('/')
  if(!user&&!loading) setPageLoading(false)
},[user,router,loading])

if(pageLoading) return null;
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar/>
            <div className="flex items-center justify-center h-[calc(100vh-5ren)]
            pointer-events-none select-none bg-dark">
            </div>
            {authModal.isOpen && <AuthModal/>}
        </div>
    </div>
  )
}

export default Auth