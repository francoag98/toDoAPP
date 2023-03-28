import React, { ReactComponentElement } from "react";
import { codeParams } from "./inicio";
import { ToDoCard } from "./ToDoCard";
import { ToDo } from "./formCreateToDo";

export const ToDoList: React.FC<codeParams> = (user: codeParams) => {
  return (
    <section>
      <h3>List of To Do</h3>
      <div>
        {user.user &&
          user.user?.posts.map((post: ToDo, index) => {
            return (
              <div key={index}>
                <ToDoCard title={post.title} description={post.description} />
              </div>
            );
          })}
      </div>
    </section>
  );
};
