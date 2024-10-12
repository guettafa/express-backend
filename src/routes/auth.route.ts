import express, {Request, Response} from "express";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

import { config } from "../config/config";
import { Role, User } from "../models/user";

const router = express();
const SECRET_KEY = config.jwt_secret;

const users : User[] = [];

router.post("/login", async (req: Request, res: Response) => {

    const {usernameOrEmail, password} = req.body;
    const user: User = users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail)!;
    
    if (!user) {
        res.status(404).json("No user with those informations can be found")
    } else {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {username: user.username, role: user.role}, // Infos in JWT 
                SECRET_KEY as string, 
                { expiresIn: "1h"}
            );
            res.json(`Bearer ${token}`);
        } else {
            res.status(400).json("Wrong Password") 
        }
    }
})

router.post("/register", async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);

    users.push({
        username: username,
        email: email,
        role: Role.EMPLOYEE, 
        password: hashedPassword
    });
    res.json({message: "Account created successfully"})
})

export default router;