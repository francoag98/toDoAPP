import React from "react";
import { AppProp, Post } from "./inicio";
import { ToDoCard } from "./ToDoCard";

export const ToDoList: React.FC<AppProp> = (props) => {
  console.log(props);
  if (props.posts.length === 0) {
    return (
      <section className="flex flex-col items-center">
        <div className="text-left">
          <h3>To Do List</h3>
        </div>
        <div>
          <p>You haven't created tasks yet</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3>TO DO LIST</h3>
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
