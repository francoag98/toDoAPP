import { Router } from "express";
import postRoute from "./postRouter"
import userRoute from "./userRoute"
const route = Router()

route.use("/", postRoute)
route.use("/", userRoute)

export default route
