"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegisterData {
  name: String;
  lastName: String;
  email: String;
  password: String;
}

const errorStyle = "text-red-600 font-bold p-1";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Insert valid email"),
    password: yup.string().required("Password is required"),
    lastName: yup.string().required("LastName is required"),
    name: yup.string().required("Name is required"),
  })
  .required();

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [result, setResult] = useState<String>("");

  const formValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const submitHandler = handleSubmit((value) => {
    const URL = process.env.NEXT_PUBLIC_BACKURL;
    setResult("");
    axios
      .post<RegisterData>(`${URL}/users`, value)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> User created <h4 style='color: green; font-weight: 700'>successfuly</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      })
      .catch((e) => {
        setResult(e.response.data.message);
      });
  });

  return (
    <main className="flex flex-col h-screen w-full m-0 bg-video">
      {/* <video src="video3.mp4" autoPlay loop muted className="bg-video"></video> */}
      <div className="flex flex-col sm:mt-9 md:mt-0">
        <h1 className="text-center font-bold text-white text-7xl sm:text-9xl mt-10 md:mt-10 lg:mt-10 2xl:mt-24 font-sans -mb-8">
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
        className="flex flex-col justify-center items-center h-full sm:-mt-10 md:mt-6">
        <div className="p-6 2xl:p-12 border-2 sm:w-96 border-white bg-white rounded-md">
          <h2 className="text-green-700 text-center text-xl -mt-3 mb-4 font-bold border-b-2 border-green-700">
            Register
          </h2>
          <div className="flex flex-col gap-1 w-full">
            <label className=" text-green-700 font-bold">Name</label>
            <input
              {...register("name")}
              onChange={formValues}
              type="text"
              placeholder="Enter your Name..."
              name="name"
              className="p-1 w-full border-b-2 bg-transparent border-green-700 text-green-700 focus:outline-none"
            />
            {errors.name?.message && (
              <p className={errorStyle}>{errors.name?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">LastName</label>
            <input
              {...register("lastName")}
              onChange={formValues}
              type="text"
              name="lastName"
              placeholder="Enter your LastName..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
            {errors.lastName?.message && (
              <p className={errorStyle}>{errors.lastName?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">Email</label>
            <input
              {...register("email")}
              onChange={formValues}
              type="email"
              name="email"
              placeholder="Enter your Email..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
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
              placeholder="Enter your Password..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
            {errors.password?.message && (
              <p className={errorStyle}>{errors.password?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <span className="mr-1 text-green-700">Do you have an account?</span>
            <Link href="/login">
              <button className="text-green-700 font-bold underline">
                Sign In
              </button>
            </Link>
          </div>
          {result.length > 0 && <p className={errorStyle}>{result}</p>}
          <div className="flex flex-col-reverse gap-1">
            <div className="text-center border-2  border-green-700 rounded-sm mt-2">
              <button
                type="submit"
                className="p-2 text-green-700 font-bold hover:bg-green-700 hover:text-white w-full">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
