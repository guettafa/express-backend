import express, {Request,Response} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const router = express.Router();

interface User {
    username: string;
    pwd: string;
}

const users: User[] = [];
const SECRET_KEY = "someSecret";

router.post("/login", async (req: Request, res: Response) => {
    const {username, pwd} = req.body;
    const user: any = users.find(u => u.username === username);

    await bcrypt.compare(pwd, user.pwd).catch(() => {
       return res.status(400).json("Wrong Password") 
    }).then(() => {
       const token = jwt.sign({username: user.username}, SECRET_KEY, { expiresIn: "1h"});
       return res.json(`Bearer ${token}`);
    });
})

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);

    users.push({
        username: username,
        pwd: hashedPassword
    });
})

export default router;