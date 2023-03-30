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
    const response = log.data;
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
    <main className="flex flex-col h-screen w-screen m-0 bg-video">
      {/* <video src="video3.mp4" autoPlay loop muted className="bg-video"></video> */}
      <div className="p-4 mt-20 flex flex-col">
        <h1 className="text-center font-bold text-white text-9xl mt-20 font-sans -mb-16">
          WELCOME
        </h1>
        <div className="text-center m-auto -mt-2">
          <p className="font-sans font-bold text-2xl text-green-700 bg-white mr-2 ml-2 pr-6 pl-7">
            TO TODO APP
          </p>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center h-full">
        <div className="p-12 border-2 border-white bg-white rounded-md">
          <h2 className="text-green-700 text-center text-xl -mt-3 mb-4 font-bold border-b-2 border-green-700">
            INICIA SESION
          </h2>
          <div className="flex flex-col gap-1 w-96">
            <label className=" text-green-700 font-bold">Email</label>
            <input
              onChange={formValues}
              type="text"
              placeholder="Ingresa tu email..."
              name="email"
              className="p-2 w-full border-b-2 bg-transparent border-green-700 text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">Password</label>
            <input
              onChange={formValues}
              type="password"
              name="password"
              placeholder="ingresa tu password..."
              className="p-2 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col-reverse gap-1">
            <div className="text-center border-2  border-green-700 rounded-sm">
              <button
                type="submit"
                className="p-2 text-green-700 font-bold hover:bg-green-700 hover:text-white w-full">
                Iniciar sesion
              </button>
            </div>
            <div className="mb-3">
              <span className="mr-1 text-green-700">No tienes cuenta?</span>
              <Link href="/register">
                <button className="text-green-700 font-bold underline">
                  Registrate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
