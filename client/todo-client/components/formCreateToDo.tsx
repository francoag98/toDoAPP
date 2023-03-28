"use client";
import axios from "axios";
import React, { useState } from "react";

export interface ToDo {
  title: string;
  description: string;
}

export const FormToDo = () => {
  const [todo, setTodo] = useState<ToDo>({
    title: "",
    description: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/posts", todo)
      .then((response) => setTodo(response.data));
    return todo;
  };

  return (
    <form>
      <h3>Create your ToDo</h3>
      <label>Title</label>
      <input
        type="text"
        placeholder="Insert your title"
        name="title"
        onChange={changeHandler}
      />
      <label>Description</label>
      <input
        type="text"
        placeholder="Create your ToDo"
        name="description"
        onChange={changeHandler}
      />
      <button type="submit">Crear</button>
    </form>
  );
};
