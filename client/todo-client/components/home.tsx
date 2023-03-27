"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { IDataUser } from '@/app/login/page'
import { useRouter } from 'next/navigation'

const Inicio: React.FC = () => {
    const router = useRouter()
    const [user, setUser] = useState<IDataUser>({
        email: "",
        name: "",
        token: "",
    })

  return (
    <div>home</div>
  )
}

export default Inicio