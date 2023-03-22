export interface user {
  name: String;
  lastName: String;
  email: String;
  password: String;
  posts: Array<post>;
}

export interface post {
  title: String;
  description: String;
  user: user;
}
