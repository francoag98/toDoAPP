export interface user {
  Name: String;
  LastName: String;
  Email: String;
  Password: String;
  Posts: Array<post>;
}

export interface post {
  Title: String;
  Description: String;
  User: user;
}
