"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const errorStyle = "text-red-600 font-bold p-1";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IDataUser {
  email: string;
  name: string;
  token: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Insert valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();

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
  const [result, setResult] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(schema),
  });
  const formValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const submitHandler = handleSubmit((value) => {
    const URL = process.env.NEXT_PUBLIC_BACKURL;
    setResult("");

    axios
      .post<IDataUser>(`${URL}/login`, value)
      .then(({ data }) => {
        document.cookie = `myToken = ${data.token}`;
        setUser(data);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
        setResult(e.response.data.message);
      });
  });
  return (
    <main className="flex flex-col h-screen w-full m-0 bg-video">
      {/* <video src="video3.mp4" autoPlay loop muted className="bg-video"></video> */}
      <div className="flex flex-col sm:mt-9 md:mt-0">
        <h1 className="text-center font-bold text-white sm:bg-transparent p-2 text-7xl sm:text-9xl mt-10 sm:mt-10 md:mt-10 lg:mt-20 2xl:mt-24 font-sans -mb-10">
          WELCOME
        </h1>
        <div className="text-center m-auto -mt-2 sm:-mt-10">
          <p className="font-sans font-bold text-sm sm:text-2xl text-green-700 sm:pl-5 sm:pr-4 pr-2 pl-3 bg-white mr-2 ml-3">
            TO TODO APP
          </p>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center h-full sm:-mt-10 md:-mt-0">
        <div className="p-6 border-2 sm:w-96 border-white bg-white rounded-md">
          <h2 className="text-green-700 text-center text-xl -mt-3 mb-4 font-bold border-b-2 border-green-700">
            Login
          </h2>
          <div className="flex flex-col gap-1 w-full">
            <label className=" text-green-700 font-bold">Email</label>
            <input
              {...register("email")}
              onChange={formValues}
              type="text"
              placeholder="Enter your email..."
              name="email"
              className="p-2 w-full border-b-2 bg-transparent border-green-700 text-green-700 focus:outline-none"
            />
            {errors.email?.message && (
              <p className={errorStyle}>{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">Password</label>
            <input
              {...register("password")}
              onChange={formValues}
              type="password"
              name="password"
              placeholder="Enter your password..."
              className="p-2 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
            {errors.password?.message && (
              <p className={errorStyle}>{errors.password?.message}</p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-1">
            <div className="text-center border-2  border-green-700 rounded-sm">
              <button
                type="submit"
                className="p-2 text-green-700 font-bold hover:bg-green-700 hover:text-white w-full">
                Submit
              </button>
            </div>
            {result.length > 0 && <p className={errorStyle}>{result}</p>}
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
