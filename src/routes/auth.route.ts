import express, {Request, Response} from "express";
import bcrypt from "bcryptjs"; 

import { User } from "../models/user";
import { addUser, getUser } from "../controllers/users.controller";
import { logger } from "../utils/logger";
import { signToken } from "../utils/jwt";

const router = express();

router.post("/login", async (req: Request, res: Response) => {
    const {usernameOrEmail, password} = req.body;
    const user: User = getUser(usernameOrEmail);
    
    if (!user) {
        res.status(404).json("No user with those informations can be found")
    } else {
        if (await bcrypt.compare(password, user.password)) {
            logger.alert(`User ${user.username} just logged in`);
            res.json({token: signToken(user.username, user.role)});
        } else {
            res.status(400).json("Wrong Password") 
        }
    }
})

router.post("/register", async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    try {
        addUser(
            username, 
            email, 
            hashedPassword
        );
    } catch (error) {
        res.status(500).json({message: error})
    }
    logger.alert(`New account has been created with email ${email}`);
    res.json({message: "Account created successfully"})
})

export default router;