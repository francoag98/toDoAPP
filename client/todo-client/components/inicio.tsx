"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

interface Post {
  title: string,
  description: string,
}

interface IUser {
  email: string,
  name: string,
  posts: Post[]
}
const Inicio: React.FC = () => {
    const [user, setUser] = useState<IUser>()

    useEffect(()=>{
      const myToken = document.cookie
      const transform = myToken.replace("myToken=", "")
      axios.get("http://localhost:3001/users/token", {
        headers:{
          Authorization: `bearer ${transform}`
        }
      }).then(response => response.data).then(data => {
        return setUser(data)
      }).catch(error => {
        console.log(error)
      });
    }, [])


  return (
    <div>

      <h1>WELCOME TO TODO APP, {user?.name}</h1>
    </div>
  )
}

export default Inicio