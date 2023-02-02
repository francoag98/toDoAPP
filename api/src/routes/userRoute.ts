import { Request, Response } from "express";
import {Router} from "express";
import { newUser } from "../Controllers/Users/UserController";
const route = Router();

route.post("/users", async (req: Request, res: Response) =>{
    const { Body } = req.body
    try {
        const userFind = await newUser(Body)
        if(userFind){
            res.status(400).send("User already exist")
        }else {
            res.status(200).send("user created")
        }
    } catch (error) {
        res.status(400).send({ error })
    }
})

export default route