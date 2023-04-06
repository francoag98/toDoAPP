import React from "react";
import { AppProp, Post } from "./inicio";
import { ToDoCard } from "./ToDoCard";

export const ToDoList: React.FC<AppProp> = (props) => {
  if (props.posts.length === 0) {
    return (
      <section className="flex flex-col items-center">
        <div className="p-2 border-b-2 w-80">
          <h3 className="text-2xl text-white font-bold">To Do List</h3>
        </div>
        <div className="p-2 mt-4">
          <p className="text-white">You haven't created tasks yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center">
      <div className="p-2 border-b-2 w-80">
        <h3 className="text-2xl text-white font-bold">To Do List</h3>
      </div>
      <div>
        {props &&
          props.posts?.map((post: Post, index) => {
            return (
              <div key={index}>
                <ToDoCard
                  title={post.title}
                  description={post.description}
                  id={post.id}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};
