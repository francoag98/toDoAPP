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
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-80 mb-6 bg-white p-4 gap-4 rounded-md">
      <div className="flex flex-col">
        <label className="text-green-700 font-bold">Title</label>
        <input
          className="p-1 border-b-2 border-green-700 focus:outline-none focus:text-green-700 text-green-700"
          type="text"
          placeholder="Insert your title"
          name="title"
          onChange={changeHandler}
          value={todo.title}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-green-700 font-bold">Description</label>
        <input
          className="p-1 border-b-2 border-green-700 focus:outline-none focus:text-green-700 text-green-700"
          type="text"
          placeholder="Insert your description"
          name="description"
          onChange={changeHandler}
          value={todo.description}
        />
      </div>
      <div className="text-center">
        <button
          className="text-green-700 font-bold w-full p-1 border-2 rounded-sm border-green-700 mt-4 hover:bg-green-700 hover:text-white hover:duration-500"
          type="submit">
          Crear
        </button>
      </div>
    </form>
  );
};
