import React from "react";
import { Func, Post } from "./inicio";
import { ToDoCard } from "./ToDoCard";

export const ToDoList: React.FC<Func> = (props) => {
  if (props.posts.length === 0) {
    return (
      <section className="flex flex-col items-center h-screen">
        <div className="p-2 border-b-2 w-80 sm:w-2/3 lg:w-1/2">
          <h3 className="text-2xl text-white font-bold sm:text-3xl lg:text-2xl xl:text-3xl">
            To Do List
          </h3>
        </div>
        <div className="p-2 mt-4">
          <p className="text-white sm:text-3xl lg:text-2xl xl:text-3xl">
            You havent created tasks yet
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center h-full">
      <div className="p-2 border-b-2 w-80 sm:w-2/3 lg:w-1/2">
        <h3 className="text-2xl text-white font-bold sm:text-3xl lg:text-xl xl:text-3xl">
          To Do List
        </h3>
      </div>
      <div className="sm:w-2/3 lg:w-1/2">
        {props &&
          props.posts?.map((post: Post, index) => {
            return (
              <div key={index} className="mb-4 h-screen">
                <ToDoCard
                  onCreate={props.onCreate}
                  title={post.title}
                  description={post.description}
                  _id={post._id}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};
