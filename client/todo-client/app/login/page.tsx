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
    console.log(loginData);
  };

  const loginUser = async (): Promise<IDataUser> => {
    const log = await axios.post("http://localhost:3001/login", loginData);
    const response = log.data;
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
    <form onSubmit={submitHandler}>
      <div>
        <label>Email</label>
        <input
          onChange={formValues}
          type="text"
          placeholder="Ingresa tu email..."
          name="email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          onChange={formValues}
          type="password"
          name="password"
          placeholder="ingresa tu password..."
        />
      </div>
      <div>
        <div>
          <button type="submit">Ingresar</button>
        </div>
        <div>
          <Link href="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
