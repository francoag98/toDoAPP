"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


export interface IUserLogin {
  email: string;
  password: string;
}

export interface IDataUser {
  email: string;
  name: string;
  token: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<IDataUser>({
    email: "",
    name: "",
    token: "",
  });

  const formValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };
  console.log(loginData);
  
  const loginUser = async (): Promise<IDataUser> => {
    const log = await axios.post("http://localhost:3001/login", loginData);
    const response = log.data
    console.log(response);
    
    setUser(response);
    return response;
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const users: IDataUser = await loginUser();
    try {
      if (user) {
        document.cookie = `myToken = ${users.token}`;
        router.push("/");
        return users;
      }
    } catch (error) {
      router.push("/login");
    }
  };
  return (
    <main className="flex flex-col h-screen css-selector">
      <div className="p-4 mt-20">
      <h1 className="text-center font-bold text-white text-4xl">RAPID NOTES</h1>
      </div>
    <form onSubmit={submitHandler} className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          onChange={formValues}
          type="text"
          placeholder="Ingresa tu email..."
          name="email"
          className="p-2 border rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Password</label>
        <input
          onChange={formValues}
          type="password"
          name="password"
          placeholder="ingresa tu password..."
          className="p-2 border rounded-sm"
        />
      </div>
      <div className="flex flex-col-reverse gap-1">
        <div className="text-center border border-white rounded-sm">
          <button type="submit" className="p-2">Iniciar sesion</button>
        </div>
        <div className="mb-3">
        <span className="mr-1">No tienes cuenta?</span>
          <Link href="/register">
            <button>Registrate</button>
          </Link>
        </div>
      </div>
    </form>
    </main>
  );
};

export default Login;
