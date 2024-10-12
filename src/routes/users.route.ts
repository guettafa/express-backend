import express, {NextFunction, Request, Response} from "express";

import { User } from "../models/user";
import { checkAccess, isEmployee } from "../middlewares/auth.middleware";
import { getUser, getUsers } from "../controllers/users.controller";

const router = express.Router();

// Authenticated routes 
router.get("/", checkAccess, (req: Request, res: Response) => {
    res.json(getUsers());
});

// Open routes
router.get("/:username", checkAccess, isEmployee, (req: Request, res: Response) => {
    const user = getUser(req.params.username); 

    if (!user) res.status(404).json({message: "User not found"});
    res.json(user);
});

export default router;