import express, {Request, Response} from "express";
import bcrypt from "bcryptjs"; 

import { User } from "../models/user";
import { addUser, getUser } from "../controllers/users.controller";
import { logger } from "../utils/logger";
import { signToken } from "../utils/jwt";
import { isValidEmail } from "../utils/regex";

const router = express();

router.post("/login", async (req: Request, res: Response) => {
    const {usernameOrEmail, password} = req.body;
    const user: User = getUser(usernameOrEmail);
    
    if (!user) {
        res.status(404).json("No user with those informations can be found");
    } else {
        if (await bcrypt.compare(password, user.password)) {
            res.json({token: signToken(user.username, user.role)});
            logger.info(`User ( ${user.username} - ${user.email} ) just logged in`);
        } else {
            res.status(400).json("Wrong Password") 
            logger.info(`Failed attempt to login to account associated to ${user.email}`)
        }
    }
})

router.post("/register", async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    if (isValidEmail(email)) {
        const hashedPassword = await bcrypt.hash(password, 15);

        res.json({message: addUser(username, email, hashedPassword)});
        logger.info(`New account has been created with email ${email}`);
    } else {
        res.status(500).json({message: 'Email is in the wrong format'});
        logger.error("Account couldn't be created because it's in the wrong format");
    }
})

export default router;