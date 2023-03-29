"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormToDo } from "./formCreateToDo";
import { ToDoList } from "./ListOfAllToDo";


export interface Post {
  title: string;
  description: string;
  id: string,
}

export interface AppProp {
  posts:{
    title: string;
    description: string;
    id: string,
  }[]
};

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

  const [posts, setPosts] = useState<AppProp>({posts:[]})

  useEffect(() => {
    const myToken = document.cookie;
    const transform = myToken.replace("myToken=", "");
    axios
      .get("http://localhost:3001/users/token", {
        headers: {
          Authorization: `bearer ${transform}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {

        return setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if(!user)return;
    const myToken = document.cookie;
    const transform = myToken.replace("myToken=", "");
    axios
      .get("http://localhost:3001/posts/userSpecified", {
        headers: {
          Authorization: `bearer ${transform}`,
        },
      })
      .then((response) => {
        setPosts(response.data)
        console.log("posts",posts);
      }).catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <main>
      <h1>WELCOME TO TODO APP, {user?.name}</h1>
      <div>
        <FormToDo />
      </div>
      <div>
        <ToDoList posts={posts?.posts} />
      </div>
    </main>
  );
};

export default Inicio;
