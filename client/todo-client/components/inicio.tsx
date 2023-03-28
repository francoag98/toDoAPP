"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormToDo } from "./formCreateToDo";
import { ToDoList } from "./ListOfAllToDo";

export interface Post {
  title: string;
  description: string;
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
        console.log(data);

        return setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    const myToken = document.cookie;
    const transform = myToken.replace("myToken=", "");
    axios
      .get("http://localhost:3001/users/token", {
        headers: {
          Authorization: `bearer ${transform}`,
        },
      })
      .then((response) => response.data);
  }, [user.posts]);

  return (
    <main>
      <h1>WELCOME TO TODO APP, {user?.name}</h1>
      <div>
        <FormToDo />
      </div>
      <div>
        <ToDoList user={user} />
      </div>
    </main>
  );
};

export default Inicio;
