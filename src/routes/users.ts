import express, {NextFunction, Request, Response} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { decode } from "punycode";

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

// Auth middleware
const checkAccess = (req: any, res: Response, next: NextFunction) => {
    const token: any = req.headers['authorization'];

    if (!token) {
        res.status(403).json({ message: "Token is missing" });
    }
    
    // Separate Bearer and token
    jwt.verify(token?.split(' ')[1], SECRET_KEY, (error: any, decoded: any) => {
        if (error) {
            res.status(403).json("Invalid Token")
        }
        // Retrieve token information
        req.user = decoded
        next();
    })
}

export default router;