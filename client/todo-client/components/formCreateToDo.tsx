"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface ToDo {
  title: string;
  description: string;
}
interface Create {
  onCreate: (value: Boolean) => void;
}
export const FormToDo: React.FC<Create> = (props) => {
  const [todo, setTodo] = useState<ToDo>({
    title: "",
    description: "",
  });
  const router = useRouter();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const myToken = document.cookie;
    const transform = myToken.replace("myToken=", "");
    await axios.post("http://localhost:3001/posts", todo, {
      headers: {
        Authorization: `bearer ${transform}`,
      },
    });
    setTodo({
      description: "",
      title: "",
    });
    props.onCreate(true);
    router.refresh();
    return todo;
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Title</label>
      <input
        type="text"
        placeholder="Insert your title"
        name="title"
        onChange={changeHandler}
        value={todo.title}
      />
      <label>Description</label>
      <input
        type="text"
        placeholder="Create your ToDo"
        name="description"
        onChange={changeHandler}
        value={todo.description}
      />
      <button type="submit">Crear</button>
    </form>
  );
};
