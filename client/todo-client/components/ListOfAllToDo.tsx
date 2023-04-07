import React from "react";
import { Func, Post } from "./inicio";
import { ToDoCard } from "./ToDoCard";

export const ToDoList: React.FC<Func> = (props) => {
    
  if (props.posts.length === 0) {
    return (
      <section className="flex flex-col items-center h-screen">
        <div className="p-2 border-b-2 w-80">
          <h3 className="text-2xl text-white font-bold">To Do List</h3>
        </div>
        <div className="p-2 mt-4">
          <p className="text-white">You havent created tasks yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center h-full">
      <div className="p-2 border-b-2 w-80">
        <h3 className="text-2xl text-white font-bold">To Do List</h3>
      </div>
      <div>
        {props &&
          props.posts?.map((post: Post, index) => {
            console.log(post);
            let id;
            console.log(id);
            
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
