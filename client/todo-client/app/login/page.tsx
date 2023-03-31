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
    <main className="flex flex-col h-screen w-full m-0 bg-video">
      {/* <video src="video3.mp4" autoPlay loop muted className="bg-video"></video> */}
      <div className="flex flex-col sm:mt-9 md:mt-0">
        <h1 className="text-center font-bold text-white sm:bg-transparent p-2 text-7xl sm:text-9xl mt-20 sm:mt-10 md:mt-24 lg:mt-26 2xl:mt-24 font-sans -mb-10">
          WELCOME
        </h1>
        <div className="text-center m-auto -mt-2 sm:-mt-10">
          <p className="font-sans font-bold text-sm sm:text-2xl text-green-700 sm:pl-5 sm:pr-4 pr-3 pl-4 bg-white mr-2 ml-3">
            TO TODO APP
          </p>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center h-full sm:-mt-10 md:-mt-0">
        <div className="p-12 border-2 sm:w-96 border-white bg-white rounded-md">
          <h2 className="text-green-700 text-center text-xl -mt-3 mb-4 font-bold border-b-2 border-green-700">
            Login
          </h2>
          <div className="flex flex-col gap-1 w-full">
            <label className=" text-green-700 font-bold">Email</label>
            <input
              onChange={formValues}
              type="text"
              placeholder="Enter your email..."
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
              placeholder="Enter your password..."
              className="p-2 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col-reverse gap-1">
            <div className="text-center border-2  border-green-700 rounded-sm">
              <button
                type="submit"
                className="p-2 text-green-700 font-bold hover:bg-green-700 hover:text-white w-full">
                Submit
              </button>
            </div>
            <div className="mb-3">
              <span className="mr-1 text-green-700">
                Do you not have an account?
              </span>
              <Link href="/register">
                <button className="text-green-700 font-bold underline">
                  Sign Up
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
