"use client";
import React from "react";
import { Post } from "./inicio";
import axios from "axios";
import Swal from "sweetalert2";

export const ToDoCard: React.FC<Post> = (post: Post) => {
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios
      .delete(`http://localhost:3001/posts/${event.currentTarget.value}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> El producto fue <h4 style='color: #DD2E2E; font-weight: 700'>deshabilitado</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `<h4>No se ha podido deshabilitar el producto!, ${err.message}</h4>`,
          timer: 2000,
        });
      });
  };

  return (
    <article className="bg-white rounded-md p-2 mt-4 w-80">
      <div className="flex gap-2">
        <div>
          <div className="border-b-2 w-full">
            <h4 className="p-1 font-bold text-green-900">{post.title}</h4>
          </div>
          <p className="p-1">{post.description}</p>
        </div>
        <div className="flex place-items-center p-2 border-l-2">
          <button type="button" onClick={() => handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
