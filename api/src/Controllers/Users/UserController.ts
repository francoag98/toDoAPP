import { user } from "../../types";
import User from "../../models/User";

export const newUser = async (Body: user) => {
  if (!Body.email || !Body.name || !Body.lastName || !Body.password)
    throw Error("Info Missing");
  if (Body.email) {
    const userExist = await User.findOne({ email: Body.email });
    if (userExist) {
      throw Error("User already exist");
    }
  }

  const newUsers = await User.create({ ...Body });
  return newUsers;
};

export const getUser = async (email: String) => {
  if (!email) throw Error("info missing");
  const userFind = await User.findOne({ email: email });
  if (!userFind) throw Error("User with that id not exist");
  return userFind;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};
