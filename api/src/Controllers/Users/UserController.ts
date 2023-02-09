import { user } from "../../types";
import User from "../../models/User";

export const newUser = async (Body: user) => {
  if (!Body.Email || !Body.Name || !Body.LastName || !Body.Password)
    throw Error("Info Missing");
  if (Body.Email) {
    const userExist = await User.findOne({ Email: Body.Email });
    if (userExist) {
      throw Error("User already exist");
    }
  }

  let newUsers = await User.create({ ...Body });
  return newUsers;
};

export const getUser = async (Email: String) => {
  if (!Email) throw Error("info missing");
  const userFind = await User.findOne({ Email: Email });
  if (!userFind) throw Error("User with that id not exist");
  return userFind;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};
