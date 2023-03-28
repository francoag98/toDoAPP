import React from "react";
import { Post } from "./inicio";
export const ToDoCard: React.FC<Post> = (post: Post) => {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
    </div>
  );
};
