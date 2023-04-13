"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormToDo } from "./formCreateToDo";
import { ToDoList } from "./ListOfAllToDo";
import { useRouter } from "next/navigation";
import { IDataUser } from "@/app/login/page";

export interface Post {
  title: string;
  description: string;
  _id: string;
}

export interface AppProp {
  posts: {
    title: string;
    description: string;
    _id: string;
  }[];
}
export interface Func extends AppProp {
  onCreate: () => void;
}
export interface Func2 extends Post {
  onCreate: () => void;
}
export interface codeParams {
  user: IUser;
}
export interface IUser {
  email: string;
  name: string;
  posts: Post[];
}
const Inicio: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    posts: [],
  });
  const [userSession, setUserSession] = useState<IDataUser>({
    Email: "",
    Name: "",
    token: "",
  });
  const [upload, setUpload] = useState<Boolean>(false);
  const [posts, setPosts] = useState<AppProp>({ posts: [] });
  const router = useRouter();
  const uploaded = (value: Boolean) => {
    if (value === true) {
      setUpload(true);
    }
  };
  const getSession = () => {
    const session = localStorage.getItem("userSession") as string;
    const res = JSON.parse(session);
    setUserSession(res);
    return res;
  };
  const userToken = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKURL}/users/token`, {
        headers: {
          Authorization: `bearer ${userSession?.token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
      })
      .catch((e) => e);
  };
  const userPosts = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKURL}/posts/userSpecified`, {
        headers: {
          Authorization: `bearer ${userSession?.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((e) => e);
  };
  const logOut = () => {
    localStorage.clear();
    document.cookie = "";
    router.push("/login");
  };
  useEffect(() => {
    getSession();
    userToken();
  }, []);

  useEffect(() => {
    userPosts();
  }, [user, userSession.token]);

  useEffect(() => {
    if (upload) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKURL}/posts/userSpecified`, {
          headers: {
            Authorization: `bearer ${userSession.token}`,
          },
        })
        .then((response) => {
          setPosts(response.data);
          setUpload(false);
          router.refresh();
        })
        .catch((error) => {
          error;
        });
    }
  }, [upload, posts, userSession.token]);

  return (
    <main className="bg-gradient-to-r from-green-500 via-green-700 to-green-900 w-full h-full">
      <h1 className="text-center text-6xl sm:text-8xl text-white p-6 font-serif">
        TO DO APP
      </h1>
      <section className="flex flex-col items-center w-full">
        <div className="flex w-full justify-center max-sm:text-center max-sm:flex-col max-sm:w-80 max-sm:items-center">
          <h3 className="text-left p-2 w-fit text-white font-bold border-b-2 text-2xl mb-4 sm:w-2/3 lg:w-1/2 xl:text-3xl">
            {userSession?.Name}, create your ToDo
          </h3>
          <div className="-ml-20 max-sm:-ml-0 max-sm:mb-2 max-sm:-mt-4">
            <button
              onClick={logOut}
              className="w-fit mr-2 mt-2 text-white border-r-2 border-l-2 max-sm:border-2 border-white p-1 hover:text-green-900 hover:bg-white hover:font-bold hover:duration-200">
              Log Out
            </button>
          </div>
        </div>
        <FormToDo
          onCreate={() => {
            uploaded(false);
            setUpload(true);
          }}
        />
      </section>
      <div>
        <ToDoList
          onCreate={() => {
            uploaded(false);
            setUpload(true);
          }}
          posts={posts?.posts}
        />
      </div>
    </main>
  );
};

export default Inicio;
