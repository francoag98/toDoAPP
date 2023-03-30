"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormToDo } from "./formCreateToDo";
import { ToDoList } from "./ListOfAllToDo";
import { useRouter } from "next/navigation";

export interface Post {
  title: string;
  description: string;
  id: string;
}

export interface AppProp {
  posts: {
    title: string;
    description: string;
    id: string;
  }[];
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
  const [upload, setUpload] = useState<Boolean>(false);
  const [posts, setPosts] = useState<AppProp>({ posts: [] });
  const router = useRouter();
  const uploaded = (value: Boolean) => {
    if (value === true) {
      setUpload(true);
    }
  };

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
    if (!posts.posts) return;
    const myToken = document.cookie;
    const transform = myToken.replace("myToken=", "");
    axios
      .get("http://localhost:3001/posts/userSpecified", {
        headers: {
          Authorization: `bearer ${transform}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        console.log("posts", posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    if (upload) {
      const myToken = document.cookie;
      const transform = myToken.replace("myToken=", "");
      axios
        .get("http://localhost:3001/posts/userSpecified", {
          headers: {
            Authorization: `bearer ${transform}`,
          },
        })
        .then((response) => {
          setPosts(response.data);
          setUpload(false);
          router.refresh();
          console.log("posts", posts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [upload, posts]);

  return (
    <main>
      <h1>WELCOME TO TODO APP, {user?.name}</h1>
      <div>
        <FormToDo
          onCreate={() => {
            uploaded(false);
            setUpload(true);
          }}
        />
      </div>
      <div>
        <ToDoList posts={posts?.posts} />
      </div>
    </main>
  );
};

export default Inicio;
