"use client";
import React, { useState } from "react";
import Link  from "next/link"

interface RegisterData {
  name: String;
  lastName: String;
  email: String;
  password: String;
}

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const formValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {};

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
              onChange={formValues}
              type="text"
              placeholder="Enter your Name..."
              name="name"
              className="p-1 w-full border-b-2 bg-transparent border-green-700 text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">LastName</label>
            <input
              onChange={formValues}
              type="text"
              name="lastName"
              placeholder="Enter your LastName..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">Email</label>
            <input
              onChange={formValues}
              type="email"
              name="email"
              placeholder="Enter your Email..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-green-700 font-bold">Password</label>
            <input
              onChange={formValues}
              type="password"
              name="password"
              placeholder="Enter your Password..."
              className="p-1 border-b-2 bg-transparent border-green-700 rounded-sm text-green-700 focus:outline-none"
            />
          </div>
          <div className="mb-3">
              <span className="mr-1 text-green-700">
                Do you have an account?
              </span>
              <Link href="/login">
                <button className="text-green-700 font-bold underline">
                  Sign In
                </button>
                </Link>
            </div>
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
