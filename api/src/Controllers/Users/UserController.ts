import { user } from "../../types";
import User from "../../models/User";

export const newUser = async (Body: user): Promise<user> => {
  if (!Body.Email || !Body.Name || !Body.LastName || !Body.Password)
    throw Error("Info Missing");
  if (Body.Email) {
    const userExist: user | null = await User.findOne({ Email: Body.Email });
    if (userExist) {
      throw Error("User already exist");
    }
  }

  const newUsers : user | any = await User.create({ ...Body });
  return newUsers;
};

export const getUser = async (Email: String): Promise<user> => {
  if (!Email) throw Error("info missing");
  const userFind: user | null = await User.findOne({ Email: Email });
  if (!userFind) throw Error("User with that id not exist");
  return userFind;
};

export const getAllUsers = async (): Promise<user> => {
  const users: user | any = await User.find();
  return users;
};
