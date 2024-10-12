import express, {Request, Response} from "express";

import { User } from "../models/user";
import { checkAccess } from "../middlewares/auth.middleware";

const router = express.Router();

const users: User[] = [];

// Authenticated routes 
router.get("/", checkAccess, (req: Request, res: Response) => {
    res.json(users);
});

// Open routes
router.get("/:username", (req: Request, res: Response) => {
    const user = users.find(u => u.username === req.params.username); 
    if (!user) {
        res.status(404).json({message: "User not found"});
    } else {
        res.json(user);
    }
});
export default router;