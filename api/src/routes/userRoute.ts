import { Request, Response } from "express";
import { Router } from "express";
import {
  getAllUsers,
  getUser,
  newUser,
} from "../Controllers/Users/UserController";
const route = Router();

route.post("/users", async (req: Request, res: Response) => {
  const Body = req.body;
  console.log(Body);
  try {
    console.log("estoy aca");
    const newPerson = await newUser(Body);
    if (newPerson) {
      res.status(200).send(newPerson);
    }
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err: any) {
    res.status(400).send({ err: err.message });
  }
});

route.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(400).send({ err: err.message });
  }
});

export default route;
