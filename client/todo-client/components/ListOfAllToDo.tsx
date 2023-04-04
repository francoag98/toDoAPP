import React from "react";
import {  AppProp, Post } from "./inicio";
import { ToDoCard } from "./ToDoCard";

export const ToDoList: React.FC<AppProp> = (props) => {
  
  return (
    <section>
      <h3>TO DO LIST</h3>
      <div>
        {props &&
          props.posts?.map((post: Post, index) => {

            return (
              <div key={index}>
                <ToDoCard title={post.title} description={post.description} id={post.id} />
              </div>
            );
          })}
      </div>
    </section>
  );
};
