import express, {NextFunction, Request, Response} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import { User } from "../models/user";

const router = express.Router();

// Fake data
const users: User[] = [];

const SECRET_KEY = "k3llyR0s3tr1ckster";

router.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const user: User = users.find(u => u.username === username)!;
    
    if (!user) {
        res.status(404).json("No user with those informations can be found")
    } else {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {username: user.username}, 
                SECRET_KEY, 
                { expiresIn: "1h"}
            );
            res.json(`Bearer ${token}`);
        } else {
            res.status(400).json("Wrong Password") 
        }
    }
})

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);

    console.log("Username :", username);
    console.log("Password:", hashedPassword);

    users.push({
        username: username,
        password: hashedPassword
    });
    res.json({message: "Account created successfully"})
})

// Auth middleware
const checkAccess = (req: any, res: Response, next: NextFunction) => {
    const token: string = req.headers['authorization'];

    // No token found
    if (!token) {
        res.status(403).json({ message: "Token is missing" });
    } else {
        // Token found

        // Separate Bearer and token
        jwt.verify(token?.split(' ')[1], SECRET_KEY, (error: any, decoded: any) => {
            if (error) {
                res.status(403).json("Invalid Token")
            }
            // Retrieve token information
            req.user = decoded
            next(); // pass to the next middleware
        })
    }
}

// This is a protected route
router.get("/", checkAccess, (req: Request, res: Response) => {
    res.json(users);
});

export default router;